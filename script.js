


var items = document.getElementsByClassName('fill');
var SSB = document.getElementById('SSB');
var modal=document.getElementById('simpleModal'); 
var modalHeader=document.getElementById('mHcontent');
var closeBtn = document.getElementById('closeBtn');
var recBtn = document.getElementById('recyclable');
var nrecBtn = document.getElementById('notRecyclable');
var currElement=document.getElementById('SSB');
var pause=false;
var answer;
var audio=new Audio('FMB.mp3');




const picNames=["images/plastBottle.jpg","images/Coffee.jpg","images/Coors.jpg"];
var foo;


// Fill listeners
for(var i=0; i<items.length; i++)
{
	var img = new Image();
	img.src=picNames[i];
	items[i].addEventListener('dragstart', dragStart);
	items[i].addEventListener('dragend', dragEnd);
	items[i].active=false;
	items[i].style.backgroundImage=`url('${img.src}')`;
	items[i].style.height=`${img.height}px`;
	items[i].style.width= `${img.width}px`;
	items[i].style.top =`${i*100}px`;

}

// Loop through empty boxes and add listeners

  SSB.addEventListener('dragover', dragOver);
  SSB.addEventListener('dragenter', dragEnter);
  SSB.addEventListener('dragleave', dragLeave);
  SSB.addEventListener('drop', dragDrop);

  recBtn.addEventListener('click',closeModal);
  nrecBtn.addEventListener('click',closeModal);


moveTrash();

function moveTrash()
{
	if(!pause)
	{
		for(var i=0; i<items.length; i++)
		{
			var c = items[i].style.top;
			n= parseInt(c);
			//console.log(fill.style.left);
			items[i].style.top=`${n-1}px`;
			//console.log(fill.style.left);

			if(n<0)
				items[i].style.top="500px";
		}
	}
	setTimeout(moveTrash,10);
}

function dragStart() 
{
	this.active = true;
	this.className += ' hold';
	setTimeout(() => (this.className = 'invisible'), 0);
	foo = this.id;
	audio.play();
}

function dragEnd() 
{
	this.active = false;
	console.log('dragEnd');
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
	console.log(foo);
	modalHeader.innerHTML = foo;
	modal.style.display = "block";
	currElement = document.getElementById(foo);
	currElement.style.display = "none";

}

function closeModal(e)
{
	answer=e.target.id;

	if(answer==currElement.firstElementChild.className)
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
