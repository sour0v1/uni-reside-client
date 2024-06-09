

const AddMeal = () => {
    return (
        <div className="font-roboto">
            <form className="px-9 grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Meal Title</label>
                    <input className="py-1 px-3 bg-gray-200 outline-none" type="text" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Category</label>
                    <input className="py-1 px-3 bg-gray-200 outline-none" type="text" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Ingredients</label>
                    <input className="py-1 px-3 bg-gray-200 outline-none" type="text" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Price</label>
                    <input className="py-1 px-3 bg-gray-200 outline-none" type="number" />
                </div>
                <div className="flex flex-col gap-2 col-span-2">
                    <label htmlFor="">Description</label>
                    <textarea className="bg-gray-200 outline-none" name="" id="" cols={2} rows={2}></textarea>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Rating</label>
                    <input className="py-1 px-3 bg-gray-200 outline-none" type="number" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Post Time</label>
                    <input className="py-1 px-3 bg-gray-200 outline-none" type="time" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Likes</label>
                    <input className="py-1 px-3 bg-gray-200 outline-none" type="number" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Reviews</label>
                    <input className="py-1 px-3 bg-gray-200 outline-none" type="number" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Admin Name</label>
                    <input className="py-1 px-3 bg-gray-200 outline-none" type="number" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Email</label>
                    <input className="py-1 px-3 bg-gray-200 outline-none" type="number" />
                </div>
                <input className='py-2 rounded bg-[#373A40] text-white hover:bg-[#0C0C0C] col-span-2' type="submit" value="Add Meal" />
            </form>
        </div>
    );
};

export default AddMeal;