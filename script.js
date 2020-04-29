


var items = document.getElementsByClassName('fill');
var boxes = document.getElementsByClassName('box');
var boxes= document.getElementsByClassName('box');
var SSB = document.getElementById('SSB');
var modal=document.getElementById('simpleModal'); 
var modalHeader=document.getElementById('mHcontent');
var recBtn = document.getElementById('recyclable');
var nrecBtn = document.getElementById('notRecyclable');
var okBtn = document.getElementsByClassName('okay');
var currElement=document.getElementById('SSB');
var pause=false;
var answer;
var audio=new Audio('FMB.mp3');




//const picNames=["images/plastBottle.jpg","images/Coffee.jpg","images/Coors.jpg"];
var foo;


// Fill listeners
for(var i=0; i<items.length; i++)
{
	var img = new Image();
	//img.src=picNames[i];
	items[i].addEventListener('dragstart', dragStart);
	items[i].addEventListener('dragend', dragEnd);
	items[i].active=false;
	//items[i].style.backgroundImage=`url('${img.src}')`;
	//items[i].style.height=`${img.height}px`;
	//items[i].style.width= `${img.width}px`;
	boxes[i].style.top =`${i*320}px`;

}

// Loop through empty boxes and add listeners

  SSB.addEventListener('dragover', dragOver);
  SSB.addEventListener('dragenter', dragEnter);
  SSB.addEventListener('dragleave', dragLeave);
  SSB.addEventListener('drop', dragDrop);

  recBtn.addEventListener('click',closeModal);
  nrecBtn.addEventListener('click',closeModal);


moveBoxes();

function moveBoxes()
{
	if(!pause)
	{
		for(var i=0; i<boxes.length; i++)
		{
			var c = boxes[i].style.top;
			n= parseInt(c);
			boxes[i].style.top=`${n-1}px`;
			if(n<-320)
				boxes[i].style.top="1600px";
		}
	}
	setTimeout(moveBoxes,10);
}

function dragStart() 
{
	this.active = true;
	this.className += ' hold';
	setTimeout(() => (this.className = 'invisible'), 0);
	foo = this.id;
	console.log("drag start");
	audio.play();
}

function dragEnd() 
{
	this.active = false;
	this.className = 'fill';
}

function dragOver(e) 
{
	console.log(e.type);
	e.preventDefault();
}

function dragEnter(e)
{
  e.preventDefault();
  this.className += ' hovered';
  console.log("dragEnter");
}

function dragLeave() 
{
	console.log('dragLeave');
	this.className = 'SSB';
}

function dragDrop(e)
{
	pause = true;
	console.log('dragDrop');
	this.className = 'SSB';
	modalHeader.innerHTML = foo;
	modal.style.display = "block";
	currElement = document.getElementById(foo);
	currElement.style.display = "none";

}

function closeModal(e)
{
	console.log(e.target);
	answer=e.target.id;

	if(answer==currElement.nextElementSibling.className)
	{
		modal.style.display="none";
		currElement.style.display="none";

	}
	else
	{
		currElement.style.display="block";
		modal.style.display="none";
	}

	pause=false;
	foo="";
	checkWin();
}


function  checkWin()
{
	var flag=new Boolean(true);

	for(var i=0; i<items.length&&flag; i++)
		if(items[i].style.display!="none")
			flag=false;
	
	if(flag)
		location.replace('https://gleece0.wixsite.com/smartslugbin');
}
