axios.get("http://api-qa.waybill-system.uc.r.appspot.com/publicAPI?method=searchCourses").then(res=>{
	
res.data.forEach(element=>{

	const eleCD=document.createElement('div')
	const elementCL=document.getElementById('CL')
	const elementCD=document.getElementById('CD')
	const eleCL =document.createElement('div')
	eleCL.setAttribute('Style','padding:10px ; border:solid 1px black')
	eleCL.innerHTML=`
	<li id=course ><img src="${element.image}" alt="" style="width:11%;height:4.8%; padding:10px border:solid 1px black">&nbsp ${element.name}</li>
	`
	eleCL.addEventListener('click',function() {
		document.getElementById('img').style. visibility = "visible"
		document.getElementById('img').src= element.image
		document.getElementById('coursename').innerHTML=element.name
		
		axios.get("http://api-qa.waybill-system.uc.r.appspot.com/publicAPI?method=getCourseDetails&id="+element.id).then(res0=>{	
			document.getElementById('price').innerHTML=res0.data.price
			document.getElementById('textdesc').innerHTML=res0.data.details
			document.getElementById('reviews').innerHTML=res0.data.reviews
			console.log(res0.data.reviews)		
})		
	})
elementCL.appendChild(eleCL)
elementCD.appendChild(eleCD)
	})
})