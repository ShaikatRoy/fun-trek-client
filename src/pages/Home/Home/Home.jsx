import Banner from "../Banner/Banner";
import JoinUs from "../Joinus/JoinUs";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructors from "../PopularInstructor/PopularInstructor";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularClasses></PopularClasses>
            <PopularInstructors></PopularInstructors>
            <JoinUs></JoinUs>
    
        </div>
    );
};

export default Home;