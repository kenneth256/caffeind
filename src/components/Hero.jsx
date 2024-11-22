import React from 'react'

const Hero = () => {
  return (
    <>
    <h1>Coffee Tracking for Coffee <abbr title='Coffee Addicts'>Fiends</abbr></h1>
    <div className='benefits-list'>
        <h3 className='font-bolder'>Try <span className='text-gradient'>Caffeind</span> and start....</h3>
        <p> Measure your blood caffeine levels </p>
        <p>Tracking your coffee intake</p>
        <p>Costing and quantifying your caffeine addiction</p>
    </div>
    <div className='card info-card'>
        <div>
            
        <i class="fa-solid fa-info"></i>
            <h3>Did you know...</h3>
        </div>
        <h5>That Caffeine&apos;s half life is 5 hours ?</h5>
        <p>This means that it takes 5 hours for Caffeine levels in your bloodstream to reduce caffeine consumed, keep you alert for some hours. If you take in 200mg, it will take it 5 hours to reduce to 100mg and it goes on until all caffeine is depleted</p>

    </div>
    </>
  )
}

export default Hero
