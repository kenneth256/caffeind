import React, {useState} from 'react'
import { coffeeOptions } from '../utils'
import Modal from './Modal';
import Authentication from './Authenticatication';
import { useAuth } from '../context/AuthContext';
import { setDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { db } from '../../firebase';

const CoffeeForm = (props) => {
const [showTypes, setShowTypes] = useState(false);
const [selectedCoffee, setSelectedCoffee] = useState('')
const [coffeeCost, setCoffeeCost] = useState(0)
const [hour, setHour] = useState(0)
const [min, setMin] = useState(0)
const [showModal, setShowModal] = useState(false)
const {isAuthenticated} = props
const {globalData, setGlobalData, globalUser} = useAuth()

async function handleSubmitForm() {
   if(!isAuthenticated) {
    setShowModal(true)
    return
   }
   if(!selectedCoffee) {
    return
   }

   try {
    const newGlobalData = {
        ...(globalData || {})
       }
       const nowTime = Date.now()
       const timeToSubstract = (hour * 60 * 60 * 100)
       const timestamp = nowTime - timeToSubstract
       const newData = {
        name: selectedCoffee,
                cost: coffeeCost
    
       }
       newGlobalData[timestamp] = {
        name: selectedCoffee,
        cost: coffeeCost
    
       }
    
       newGlobalData[timestamp] = newData
        console.log(timestamp, selectedCoffee, coffeeCost)
        setGlobalData(newGlobalData)
        const useRef = doc(db, 'users', globalUser)
        const res = await setDoc(useRef, {
            [timestamp]: newData
            
        }, {merge: true})
        
        setSelectedCoffee(null)
        setCoffeeCost(0)
        setHour(0)
        setMin(0)
       


    
   } catch (error) {
    console.log(error)
    
   }

   

}

  return (
    <>
    {
    showModal &&  <Modal handleCloseModal={() => setShowModal(false)} >
    <Authentication handleCloseModal={() => {setShowModal(false)}} />
  </Modal>
   }
    <div className='section-header'>
        <i className='fa-solid fa-pencil'/>
        <h2>Start Tracking Today</h2>
    </div>
    <h4>Select Coffee type</h4>
    <div className='coffee-grid'>
        {
            coffeeOptions.slice(0, 5).map((coffeeOption, coffeeIndex) => (
                <button className={'button-card' + (coffeeOption.name === selectedCoffee ? 'coffee-button-selected' : ' ')} key={coffeeIndex} onClick={() => {setSelectedCoffee(coffeeOption.name), setShowTypes(false)}}>
                    <h4>{coffeeOption.name}</h4>
                    <p> {coffeeOption.caffeine}mg</p>
                </button>
            ))
        }
        <button className={'button-card' + (showTypes ? 'coffee-button-selected' : ' ')} onClick={() => {setShowTypes(!showTypes), setSelectedCoffee(null)}}>
            <h4>Other Options</h4>
            <p>n/a</p>
        </button>
    </div>
    {
        showTypes && <select id='coffee-list' name='coffee-list' onChange={(e) => setSelectedCoffee(e.target.value)} >
        <option value={null}>Select Type</option>
            {
                coffeeOptions.slice(5).map((option, optionIndex) => {
                    return <option className='' key={optionIndex} value={option.name}>
                     {option.name} {option.caffeine} mg
                    </option>
                })
            }
        
    </select>
    }
    <h4>Add the Cost ($)</h4>
    <input className='w-full' type='number' placeholder='Enter cost' value={coffeeCost} onChange={(e) => setCoffeeCost(e.target.value)} />
    <h4>Time Since consumption</h4>
    <div className='time-entry'>
        <div> 
            <h6>Hour</h6>
            <select id='hours-select' onChange={(e) => setHour(e.target.value)}>
                {[0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23].map((hour, hourIndex) => {
                    return (
                        <option value={hour} key={hourIndex} > {hour}</option>
                    )
                })}
            </select>
        </div>

        <div> 
            <h6>Minutes</h6>
            <select id='mins-select' onChange={(e) => setMin(e.target.value)}>
                {[0, 10, 15, 30, 45].map((mins, minIndex) => {
                    return (
                        <option value={min} key={minIndex} > {mins}</option>
                    )
                })}
            </select>
        </div>
    </div>
    <button onClick={() => handleSubmitForm()}>Add Entry</button>
  </>
  )
}

export default CoffeeForm
