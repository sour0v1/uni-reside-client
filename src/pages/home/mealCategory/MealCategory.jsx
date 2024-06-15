import 'react-tabs/style/react-tabs.css';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import MealCard from '../../../components/MealCard';
import CategoryMeals from '../../../components/CategoryMeals'

const MealCategory = () => {
    return (
        <div className='mt-16 font-roboto'>
            <Tabs defaultIndex={0} onSelect={(index) => console.log(index)}>
                <TabList className={'flex justify-center items-center mb-9'}>
                    <Tab>
                        Breakfast
                    </Tab>
                    <Tab>Lunch</Tab>
                    <Tab>Dinner</Tab>
                    <Tab>All</Tab>
                </TabList>
                <TabPanel>
                    <CategoryMeals mealCategory={'breakfast'}></CategoryMeals>
                </TabPanel>
                <TabPanel>
                    <CategoryMeals mealCategory={'lunch'}></CategoryMeals>
                </TabPanel>
                <TabPanel>
                    <CategoryMeals mealCategory={'dinner'}></CategoryMeals>
                </TabPanel>
                <TabPanel>
                    <CategoryMeals mealCategory={'all'}></CategoryMeals>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default MealCategory;