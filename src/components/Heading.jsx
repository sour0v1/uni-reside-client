import React from 'react';

const Heading = ({title}) => {
    return (
        <div className='font-roboto text-xl font-bold py-6 bg-gray-100 mx-6 flex justify-center items-center mb-9'>
            <h1>{title}</h1>
        </div>
    );
};

export default Heading;