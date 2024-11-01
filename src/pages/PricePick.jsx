import React from 'react';

const PricePick = () => {
    return (
        <div className="flex flex-col items-center">
            <div className='rounded-xl mt-6 w-full h-56'>
                <img className="w-full h-64 rounded-3xl" src={"https://uppity.co.kr/wp-content/uploads/2024/06/anthony-delanoix-QAwciFlS1g4-unsplash-1024x683.jpg"} alt="설명 텍스트" />
            </div>
            
            <div className='mt-16 h-64'>
                <h1 className='text-2xl'>특가 항공권</h1>
                <div className='flex space-x-4 mt-3'>
                    <img className="w-52 h-64 rounded-3xl" src={"https://tourimage.interpark.com/product/tour/00161/A60/1000/A6013263_62_230.jpg"} alt="설명 텍스트" />
                    <img className="w-52 h-64 rounded-3xl" src={"https://tourimage.interpark.com/product/tour/00161/A60/1000/A6013263_45_123.jpg"} alt="설명 텍스트" />
                    <img className="w-52 h-64 rounded-3xl" src={"https://tourimage.interpark.com/product/tour/00161/A10/1000/A1034600_7_160.jpg"} alt="설명 텍스트" />
                    <img className="w-52 h-64 rounded-3xl" src={"https://tourimage.interpark.com/product/tour/00161/A60/500/A6013263_26_833.jpg"} alt="설명 텍스트" />
                </div>
                
            </div>
        </div>
    );
}

export default PricePick;
