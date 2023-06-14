import Banner from "../Banner/Banner";
import JoinUs from "../Joinus/JoinUs";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructor from "../PopularInstructor/PopularInstructor";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularClasses></PopularClasses>
            <PopularInstructor></PopularInstructor>
            <JoinUs></JoinUs>
    
        </div>
    );
};

export default Home;