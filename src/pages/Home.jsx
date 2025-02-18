import { useSEO } from "../hooks/useSEO"

const Home = () => {
    useSEO({ title: 'Home' });

    return (
        <>
            <div className="h-screen flex flex-col justify-center items-center">
                <h1 className='text-5xl text-primary'>Home</h1>
            </div>
        </>
    )
}

export default Home