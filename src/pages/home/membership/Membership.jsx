
import { MdOutlineCheck } from 'react-icons/md';

const Membership = () => {
    return (
        <div className='font-roboto max-w-5xl mx-auto my-16 px-9 lg:px-0'>
            <h2 className='text-center text-2xl font-bold mb-9'>Membership</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-9'>
                {/* card 1 */}
                <div className='flex flex-col shadow p-6 rounded space-y-4 bg-gray-100'>
                    <h4 className='font-bold'>Silver</h4>
                    <h2 className='text-4xl font-bold'>$10<sub className='opacity-30'>/month</sub></h2>
                    <p>Exclusive perks for our Silver Members!</p>
                    <div className='flex flex-col gap-3 grow'>
                        <div className='flex justify-start items-center gap-2'>
                            <span><MdOutlineCheck /></span>
                            <span>Basic amenities included</span>
                        </div>
                        <div className='flex justify-start items-center gap-2'>
                            <span><MdOutlineCheck /></span>
                            <span>Standard room access</span>
                        </div>
                        <div className='flex justify-start items-center gap-2'>
                            <span><MdOutlineCheck /></span>
                            <span>Essential support services</span>
                        </div>
                        
                    </div>
                    <button className='w-full py-2 bg-[#373A40] text-white hover:bg-[#0C0C0C] '>Upgrade</button>
                </div>
                {/* card 2 */}
                <div className='shadow p-6 rounded space-y-4 bg-gray-100 flex flex-col'>
                    <h4 className='font-bold'>Gold</h4>
                    <h2 className='text-4xl font-bold'>$20<sub className='opacity-30'>/month</sub></h2>
                    <p>Gold Membership: Premium Benefits for University Residents</p>
                    <div className='flex flex-col gap-3 grow'>
                        <div className='flex justify-start items-center gap-2'>
                            <span><MdOutlineCheck /></span>
                            <span>Enhanced room features</span>
                        </div>
                        <div className='flex justify-start items-center gap-2'>
                            <span><MdOutlineCheck /></span>
                            <span>Priority support services</span>
                        </div>
                        <div className='flex justify-start items-center gap-2'>
                            <span><MdOutlineCheck /></span>
                            <span>Access to additional amenities</span>
                        </div>

                    </div>
                    <button className='w-full py-2 bg-[#373A40] text-white hover:bg-[#0C0C0C] '>Upgrade</button>
                </div>
                {/* card 3 */}
                <div className='shadow p-6 rounded space-y-4 bg-gray-100 flex flex-col'>
                    <h4 className='font-bold grow'>Platinum</h4>
                    <h2 className='text-4xl font-bold grow'>$50<sub className='opacity-30'>/month</sub></h2>
                    <p>Exclusive access to premium hostel services</p>
                    <div className='flex flex-col gap-3 grow'>
                        <div className='flex justify-start items-center gap-2'>
                            <span><MdOutlineCheck /></span>
                            <span>Premium room upgrades</span>
                        </div>
                        <div className='flex justify-start items-center gap-2'>
                            <span><MdOutlineCheck /></span>
                            <span>Exclusive dining options</span>
                        </div>
                        <div className='flex justify-start items-center gap-2'>
                            <span><MdOutlineCheck /></span>
                            <span>Comprehensive concierge services</span>
                        </div>
                        
                    </div>
                    <button className='w-full py-2 bg-[#373A40] text-white hover:bg-[#0C0C0C] '>Upgrade</button>
                </div>
            </div>
        </div>
    );
};

export default Membership;