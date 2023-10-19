function Node(pos, path) {
	return { pos, path };
  }

  function getMoves (x,y) {
	let arr = [];
	let moves = [
		[1,2],[-1,2],
        [1,-2], [-1,-2],
        [2,1], [2,-1],
        [-2,1], [-2,-1]
	]

	moves.forEach((e)=> {
		let xCor = e[0] + x;
		let yCor= e[1] + y;
		if (xCor>=0 && xCor<=7 && yCor>=0 && yCor<=7)
		arr.push([xCor, yCor]);
	})
		return arr;
  }

  let pathArray = [];
  function knightMoves(start, end) {
	let q = [Node([start[0], start[1]], [[start[0], start[1]]])];
	let currentNode = q.shift();
  
	while (currentNode.pos[0] !== end[0] || currentNode.pos[1] !== end[1]) {
	  let moves = getMoves(currentNode.pos[0], currentNode.pos[1]);
		
	  moves.forEach((move) => {
		let node = Node(move, currentNode.path.concat([move]));
		  q.push(node);	
	  });
	  currentNode = q.shift();
	} 

	console.log(`${currentNode.path.length - 1}steps`);
	pathArray = [];
	currentNode.path.forEach((pos) => {
		pathArray.push(pos);
	  console.log(pos);
	});
  }
  //knightMoves([0, 0], [7, 7]);

  //create board
  let container = document.querySelector('.container');
  let table = document.createElement("table");
for (let i = 7; i >= 0; i--) {
    let tr = document.createElement('tr');
    for (let j = 0; j < 8; j++) {
        let td = document.createElement('td');
        if (i%2 == j%2) {
            td.className = "white";
        } else {
            td.className = "black";
        }
		td.id = `${i},${j}`;
        tr.appendChild(td);
    }
    table.appendChild(tr);
	
}
container.appendChild(table);


function createKnight () {
	let knight = new Image();
	knight.src='./knight.png';
	knight.width=50;
	knight.height=50;

	return knight; 
}

function moveKnight(selectedCell) {
	let knight = createKnight();
	let cells = document.querySelectorAll('td');

	cells.forEach((e)=> {
		if (e.children.length) {
			 {
				e.removeChild(e.firstChild); 
				e.classList.remove('gray');
			}
			
		}
	})
		
	cells.forEach((e)=> {
		if (e.id ===selectedCell) {
			e.classList.add('gray');
			e.append(knight);
		}
	})
	
}

//remove old active tab if it exists
function removeActivePage() {
	let start = document.querySelector('.place');
	let end = document.querySelector('.end');
	let travail = document.querySelector('.travail');
	let clear = document.querySelector('.clear');

	let arr = [start, end, travail, clear];

	arr.forEach((e)=> {
		if (e.classList.contains('active')){
			e.classList.remove('active');
		}
	})
}

function cleanCells() {
	cells = window.document.querySelectorAll('td');
	cells.forEach((e)=> {
		e.classList.remove('purple');
		if (e.querySelector('.path-Number')!==null) {
			children = e.childNodes;
			for (let i=0; i<children.length;i++) {
				if (children[i].classList.contains('path-Number')) {
					e.removeChild(children[i]);
				}				
			} 	
		} 
	}) 
}

let placeKnight = document.querySelector('.place');

placeKnight.addEventListener('click', function() {
	
	removeActivePage();
	placeKnight.classList.add('active');

	let cells = document.querySelectorAll('td');	
	cells.forEach((e)=> {
		e.addEventListener('click', function () {
			if (placeKnight.classList.contains('active')) {
			cleanCells();
			 moveKnight(e.id);
			 startingPoint = e.id;
			}
			
		})
	})
})

//select End
let end = document.querySelector('.end');
end.addEventListener('click', function() {
	removeActivePage();
	end.classList.add('active');
	
	let cells = document.querySelectorAll('td');
	cells.forEach((e)=> {
		e.addEventListener('click', function() {
			if (end.classList.contains('active')){
				cleanCells();
				//remove old 
				cells.forEach(e=> {
					if (e.classList.contains('red'))
						e.classList.remove('red');
				})
				e.classList.add('red');
				endingPoint = e.id;
			}
		})
	})
})

//travail 
let startingPoint;
let endingPoint;
let travail = document.querySelector('.travail');
travail.addEventListener('click', function() {
	removeActivePage();
	travail.classList.add('active');

		resetError = document.querySelector('.error');
		resetError.innerHTML='';
		handleError();
		let start = startingPoint.split(',').map(Number);
		let end = endingPoint.split(',').map(Number);
	

	knightMoves(start,end);
	//clean previous cells
	cleanCells();
	//get cells
	let cells = document.querySelectorAll('td');
	cells.forEach((e)=> {
		pathArray.forEach((el,i)=> {
		let id = e.id.split(',').map(Number);
			if (id[0] === el[0] && id[1]=== el[1]) {
				e.classList.add('purple');
				let pathNumber = document.createElement('p');
				pathNumber.classList.add('path-Number');
				pathNumber.textContent = i;
				if(e.querySelector('.path-Number')===null)
				e.appendChild(pathNumber);
			}
		}) 
	})
})

//clear 
let clear = document.querySelector('.clear');
clear.addEventListener('click',function() {
	removeActivePage();
	clear.classList.add('active');

	cells = window.document.querySelectorAll('td');
	cells.forEach((e)=> {
		e.classList.remove('purple');
		e.classList.remove('red');
		e.classList.remove('gray');

			children = e.childNodes;
			children.forEach((el)=> {
				e.removeChild(el);
			})	
			
			children.forEach((el)=> {
				e.removeChild(el);
			})	
	}) 
})

function handleError() {
	let error = document.querySelector('.error');

	if (startingPoint===undefined && endingPoint===undefined) {
		error.innerHTML = 'Please Select starting and ending points';
	}
	else if (startingPoint===undefined) {		
		error.innerHTML = 'Please Select start point';
	}

	else if (endingPoint===undefined) {
		error.innerHTML = 'Please Select end point';
	}
}