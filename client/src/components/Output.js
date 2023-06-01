import './Output.css'

function Output(output) {
    console.log(output.heroPredict)
    return <div className='text-center output container'>
        <h3>{output.heroPredict[0]}</h3>
        <img src={output.heroPredict[1]} alt={output.heroPredict[0] + '.img'}></img>
    </div>
}
export default Output