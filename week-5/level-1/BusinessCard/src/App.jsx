import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import './style.css'

function App() {
  const [data,setData]=useState([]);

  let getData=async()=>{
    try{
      let response=await fetch("");
      let result=await response.json();
      setData(result);
    }catch(err){
      console.log(err);
    }
  }

  return (
    <>
      <Form></Form>
      <button className='btn' onClick={getData}>Get cards</button>
      {
        data.map((card)=>{
          return <BusinessCard {...card}></BusinessCard>
        })
      }
    </>
  )
}

function Form(){
  let [formData, setFormData]=useState({
    name:'',
    description:'',
    Interests:'',
    SocialMedia:[]
  })

  let SocialMediaHandler=(e)=>{
    let socialObj={
      media:e.target.id,
      Link:e.target.value
    }

    let updatedSocialMedia;
    if(socialObj.Link==''){
      updatedSocialMedia=formData.SocialMedia.filter((social)=>{
      if(social.media!=e.target.id){
        return true;
      }
      return false;

    })
    }else{
      updatedSocialMedia=formData.SocialMedia.filter((social)=>{
      if(social.media!=e.target.id){
        return true;
      }
      return false;
    })
    updatedSocialMedia.push(socialObj);
  }
  setFormData({...FormData,[e.target.name]:updatedSocialMedia})
  }

  let basicHandler=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  let submitHandler=(e)=>{
    e.preventDefault();
    fetch("",{}).then((response)=>{
      alert("Submitted form succesfully");
    }).catch((err)=>{
      console.log(err);
    })

  }

  <form onSubmit={submitHandler}>
    <label>
      Name
    </label>
    <input type='text' id="name" name="name" value={formData.name} onChange={basicHandler}></input>
    <br></br>

    <label>
      Description
    </label>
    <input type='text' id="description" name="description" value={formData.description} onChange={basicHandler}></input>
    <br></br>

    <label>
      Interests
    </label>
    <input type='text' id="Interests" name="Interests" value={formData.Interests} onChange={basicHandler}></input>
    <br></br>

    <label>
      Github Link
    </label>
    <input type='text' id="Github" name="SocialMedia" onChange={SocialMediaHandler} ></input>
    <br></br>

    <label>
      Linkedin Link
    </label>
    <input type='text' id="Linkedin" name="SocialMedia"  onChange={SocialMediaHandler}></input>
    <br></br>

    <label>
      Twitter Link
    </label>
    <input type='text' id="Twitter" name="SocialMedia" onChange={SocialMediaHandler}></input>
    <br></br>

    <button type="submit" className='btn'> Create a card</button>
  </form>

}

function BusinessCard(props){
  let {Interests,Social}=props

  let redirectLink=(link)=>{
    window.open(link,'_blank')
  }
  return (
    <div className='Card'>
      <h2>{props.name}</h2>
      <p>{props.desc}</p>
      <h3>Interests</h3>
      <ul>
        {
          Interests.map((interest)=>{
            return <li>{interest}</li>
          })
        }
      </ul>
      <h3>Contact</h3>
      <div class="Contact">
        {
          Social.map((social)=>{
            return <button className="btn" onClick={()=>redirectLink(social.Link)}>{social.media}</button>
          })
        }
      </div>
    </div>
  )
}

export default App
