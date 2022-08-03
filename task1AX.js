
let cancel
window.addEventListener("load", event => {
  if (cancel) clearTimeout(cancel)
  cancel = setTimeout(() => {
    localStorage.setItem("notes", event.target.value)
  }, 1000)
})


axios.get("http://api-qa.waybill-system.uc.r.appspot.com/publicAPI?method=searchCourses").then(res=>{

	const loginForm = document.getElementById("login-form");
	const loginButton = document.getElementById("login-submit");
	const loginErrorMsg = document.getElementById("login-error-msg");
	const body=document.getElementById("body");
	const doc=document.getElementById("login");
	

res.data.forEach(element=>{
	loginButton.addEventListener("click", (e) => {
		e.preventDefault();
		const username = loginForm.username.value;
		if (username ==element.id) {
			alert("You have successfully logged in.");
			loginErrorMsg.style.display='none'
			body.style.display="block"
			doc.style.display="none"
			localStorage.setItem("id",element.id)	
			document.getElementById("user").innerHTML="user "+element.id
		} else {
			loginErrorMsg.style.opacity = 1;
		}
	})
	
	

	const eleCD=document.createElement('div')
	const elementCL=document.getElementById('CL')
	const elementCD=document.getElementById('CD')
	const eleCL =document.createElement('div')
	eleCL.setAttribute('Style','padding:10px ; border:solid 1px black;text-align: left')

	eleCL.innerHTML=`
	<li class="course"><img src="${element.image}" alt="" style="width:11%;height:4.8%; padding:10px border:solid 1px black">&nbsp ${element.name}</li>
	`
	
	eleCL.addEventListener('click',function() {
		document.getElementById('img').style. visibility = "visible"
		document.getElementById('img').src= element.image
		document.getElementById('coursename').innerHTML=element.name
		
		axios.get("http://api-qa.waybill-system.uc.r.appspot.com/publicAPI?method=getCourseDetails&id="+element.id).then(res0=>{	
			document.getElementById('price').innerHTML='Price:'+res0.data.price
			document.getElementById('textdesc').innerHTML=res0.data.details
			
				document.getElementById("rev").innerHTML=""
			res0.data.reviews.forEach(element0=>{
				//console.log(element0.name)
				const review=document.createElement('div')
				const x=document.getElementById("rev")
				

				review.innerHTML=`
				<p id="name">Name: ${element0.name} </p>
				<p id="rating">Rating: ${element0.rating} </p>
				<p id="details">Details: ${element0.details} </p>
				`
				
				
				x.appendChild(review)
				
			})
			


					})
	})
			elementCL.appendChild(eleCL)
			elementCD.appendChild(eleCD)
			
	})
})

function myFunction()
{
		let input = document.getElementById('search').value
		input=input.toLowerCase()
		let x = document.getElementsByClassName('course')

		for (i = 0; i < x.length; i++) { 
			if (x[i].innerHTML.toLowerCase().includes(input)) {
				x[i].style.display="list-item"
			}
			else { 
				x[i].style.display="none"
			}
		}
}
document.cookie = 'dark_mode=true'