
const AuthHeader = ({title, desc}) => {
    return (
        <div className='heading'>
            <h1 className="text-mirage-950 text-2xl font-semibold text-center mb-3">{title}</h1>
            <p className="text-paragrah-color text-center">{desc}</p>
        </div>
    )
}

export default AuthHeader