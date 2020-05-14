
window.addEventListener("dragover",function(e){
	e = e || event;
	e.preventDefault();
  },false);
  window.addEventListener("drop",function(e){
	e = e || event;
	e.preventDefault();
  },false);

window.onload = function()
{

var items = document.getElementsByClassName('fill');
var boxes = document.getElementsByClassName('box');
var conveyor = document.getElementById('conveyor');

var SSB = document.getElementById('SSB');

var modal=document.getElementById('simpleModal'); 
var modal2=document.getElementById('simpleModal2');
var modalHeader=document.getElementById('mHcontent');
var modalBody = document.getElementById('modal-body1');
var modalBody2= document.getElementById('modal-body2');
var modalHeader2=document.getElementById('mHcontent2')
var modalFooter2=document.getElementById('modal-footer2')
var recBtn = document.getElementById('Recyclable');
var nrecBtn = document.getElementById('Non-Recyclable');
var okBtn = document.getElementById('OK');


var currElement=document.getElementById('SSB');
var pause=false;
var counter =document.getElementById('counter');
var answer;
var beforeText = document.getElementById('before1');
//var audio=new Audio('FMB.mp3');
var foo;
var amtItems=items.length;

var cummulativeHeight = 0;
var contain=document.getElementById('contain');
counter.innerHTML=items.length;

for(var i=0; i<items.length; i++)
{
	items[i].addEventListener('dragstart', dragStart);
	items[i].addEventListener('dragend', dragEnd);
	items[i].active=false;
	boxes[i].style.width = `${boxes[i].firstElementChild.width}px`;
	boxes[i].style.height = `${boxes[i].firstElementChild.height}px`;

	boxes[i].style.top =`${cummulativeHeight}px`;
	cummulativeHeight += boxes[i].firstElementChild.height;
	//boxes[i].style.padding='10px';

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
			if(n<-parseInt(boxes[i].style.height))
			{
				boxes[i].style.top=`${cummulativeHeight-parseInt(boxes[i].firstElementChild.height)}px`;
			}
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
		modalBody2.firstElementChild.innerHTML=currElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
		modalHeader2.innerHTML="Correct!";
		amtItems -=1;
		counter.innerHTML=amtItems;
		conveyor.removeChild(currElement.parentElement); //boxes.length --;
		cummulativeHeight -= currElement.height;
		//console.log("removed an item of height: "+currElement.height+" and now cummulative height is: "+cummulativeHeight);
		modalHeader2.parentElement.style.backgroundColor="green";
		modalFooter2.style.background="green";

		//perhaps manually position the items. 
		cummulativeHeight=0;
		for(var i=0; i<boxes.length; i++)
		{
			boxes[i].style.top =`${cummulativeHeight}px`;
			cummulativeHeight += boxes[i].firstElementChild.height;
		}



	}
	else
	{
		currElement.style.display="block";
		modal.style.display="none";
		modalBody2.firstElementChild.innerHTML=currElement.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
		modalHeader2.innerHTML="Incorrect!";
		modalHeader2.parentElement.style.backgroundColor="red";
		modalFooter2.style.background="red";

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
	if(boxes.length==0)
		location.assign('https://docs.google.com/forms/d/e/1FAIpQLSenLLisuJJ3zySVmvuHmVGbMmvkFgeZ8NGz0baD76D3ecfL9Q/viewform?usp=sf_link');
}
}