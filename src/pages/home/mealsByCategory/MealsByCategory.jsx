import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const MealsByCategory = () => {
    const axiosPublic = useAxiosPublic();
    const handleMealCategory = async (category) => {
        const res = await axiosPublic.get(`/meals-by-category/${category}`)
        console.log(`${category} data - `,res.data);
    }
    const handleAllCategory = async () => {
        const res = await axiosPublic.get('/all-category-meals');
        console.log('all category meals - ', res.data);
    }
    return (
        <>
            <h2 className='text-center text-2xl font-bold mb-9'>Meals By Category</h2>
            <Tabs className={'max-w-6xl mx-auto font-roboto'}>
                <TabList className={'flex justify-center items-center'}>
                    <Tab onClick={() => handleMealCategory('breakfast')}>Breakfast</Tab>
                    <Tab onClick={() => handleMealCategory('launch')}>Launch</Tab>
                    <Tab onClick={() => handleMealCategory('dinner')}>Dinner</Tab>
                    <Tab onClick={ handleAllCategory}>All Meals</Tab>
                </TabList>

                <TabPanel>
                    <div className={'flex justify-center items-center'}>
                        <h1>breakfast content</h1>
                    </div>
                </TabPanel>
                <TabPanel>
                    <h2>Launch Content</h2>
                </TabPanel>
                <TabPanel>
                    <h2>Dinner Content</h2>
                </TabPanel>
                <TabPanel>
                    <h2>All Meals Content</h2>
                </TabPanel>
            </Tabs>
        </>
    );
};

export default MealsByCategory;