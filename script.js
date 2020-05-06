


var items = document.getElementsByClassName('fill');
var boxes = document.getElementsByClassName('box');
var boxes= document.getElementsByClassName('box');
var SSB = document.getElementById('SSB');
var modal=document.getElementById('simpleModal'); 
var modal2=document.getElementById('simpleModal2');
var modalHeader=document.getElementById('mHcontent');
var modalBody = document.getElementById('modal-body1');
var modalBody2= document.getElementById('modal-body2');
var modalHeader2=document.getElementById('mHcontent2')
var recBtn = document.getElementById('recyclable');
var nrecBtn = document.getElementById('notRecyclable');
var okBtn = document.getElementById('okay');
var currElement=document.getElementById('SSB');
var pause=false;
var counter =document.getElementById('counter');
var answer;
var beforeText = document.getElementById('before1');
//var audio=new Audio('FMB.mp3');
var foo;
var amtItems=items.length;



counter.innerHTML=items.length;

for(var i=0; i<items.length; i++)
{
	var img = new Image();
	items[i].addEventListener('dragstart', dragStart);
	items[i].addEventListener('dragend', dragEnd);
	items[i].active=false;
	boxes[i].style.top =`${i*320}px`;

}


  SSB.addEventListener('dragover', dragOver);
  SSB.addEventListener('dragenter', dragEnter);
  SSB.addEventListener('dragleave', dragLeave);
  SSB.addEventListener('drop', dragDrop);

  recBtn.addEventListener('click',closeModal);
  nrecBtn.addEventListener('click',closeModal);
  okBtn.addEventListener('click',closeModal2);


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
	//audio.play();
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
	currElement = document.getElementById(foo);
	modalHeader.innerHTML = foo;
	modalBody.firstElementChild.innerHTML = currElement.nextElementSibling.nextElementSibling.innerHTML;
	modal.style.display = "block";
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
		modalBody2.firstElementChild.innerHTML=currElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
		modalHeader2.innerHTML="correct!";
		amtItems -=1;
		counter.innerHTML=amtItems;

	}
	else
	{
		currElement.style.display="block";
		modal.style.display="none";
		modalBody2.firstElementChild.innerHTML=currElement.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
		modalHeader2.innerHTML="wrong!";
	}

	modal2.style.display="block";

	pause=false;
	foo="";

}

function closeModal2(e)
{
	modal2.style.display="none";
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
