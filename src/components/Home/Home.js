import React from 'react'
import videoHomePage from '../../assets/intro-home.mp4'
const Home = () => {
    return (
        <div className='home-container'>
            <div className='d-flex w-100 '>
                <div className='w-50'>
                    <h1 className=''>
                        Phần mềm check in chấm công etcetc etc etc etc etc etc etc etc etc  etc etc c
                    </h1>
                    <div className='mt-3'>
                        loremispum loremispum loremispum loremispum loremispum loremispum loremispum loremispum loremispum
                    </div>
                    <div className='mt-3'>
                        loremispum  loremispum loremispum loremispum loremispum loremispum loremispum loremispum loremispum
                    </div>
                    <div className='mt-3 w-100 d-flex justify-content-center'>
                        <button className='btn border-dark form-control-lg text-info border-2 '>
                            Check in here
                        </button>
                    </div>
                </div>
                <div className='d-flex justify-content-end w-[720px]'>
                    <video
                        className=' right-0'
                        width='700px'
                        autoPlay
                        muted
                        loop
                    >
                        <source
                            src={videoHomePage}
                            type='video/mp4'
                        />
                    </video>
                </div>
            </div>
            <div className='home-content'>

            </div>
        </div>
    )
}

export default Home
