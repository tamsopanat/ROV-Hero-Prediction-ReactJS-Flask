import './Forminput.css'
import { useEffect, useState } from 'react';
import axios from 'axios';


function Forminput(props) {
    // Set Data for input model
    const [heroData, setheroData] = useState({});
    function handleFormSubmit(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: "http://localhost:5000/",
            headers: { 'content-type': 'application/json' },
            data: heroData
        })
            .then(result => {
                props.onAddResult(result.data)
                console.log(`Result in Forminput : ${result.data} --> Send to App`)
            })
            .catch(error => {
                console.log(error);
            })
    }

    //Decorate input form with hero img


    return <form className="form-input container">
        <div className='row'>
            <div className="col text-center">
                <h3 style={{ color: '#356CB5' }}>Blue Team</h3>
            </div>
            <div className="col text-center">
                <h3 style={{ color: '#E82734' }}>Red Team</h3>
            </div>
        </div>
        <div className='row'>
            <div className="input blue col first">
                <label>Carry</label>
                <input type="text" onChange={e => setheroData({ ...heroData, 'carryTeamBlue': e.target.value })}></input>
            </div>
            <div className="input red col first">
                <label>Carry</label>
                <input type="text" onChange={e => setheroData({ ...heroData, 'carryTeamRed': e.target.value })}></input>
            </div>
        </div>
        <div className='row'>
            <div className="input blue col">
                <label>Mage</label>
                <input type="text" onChange={e => setheroData({ ...heroData, 'mageTeamBlue': e.target.value })}></input>
            </div>
            <div className="input red col">
                <label>Mage</label>
                <input type="text" onChange={e => setheroData({ ...heroData, 'mageTeamRed': e.target.value })}></input>
            </div>
        </div>
        <div className='row'>
            <div className="input blue col">
                <label>Jungle</label>
                <input type="text" onChange={e => setheroData({ ...heroData, 'jungleTeamBlue': e.target.value })}></input>
            </div>
            <div className="input red col">
                <label>Jungle</label>
                <input type="text" onChange={e => setheroData({ ...heroData, 'jungleTeamRed': e.target.value })}></input>
            </div>
        </div>
        <div className='row'>
            <div className="input blue col">
                <label>Off Lane</label>
                <input type="text" onChange={e => setheroData({ ...heroData, 'offTeamBlue': e.target.value })}></input>
            </div>
            <div className="input red col">
                <label>Off Lane</label>
                <input type="text" onChange={e => setheroData({ ...heroData, 'offTeamRed': e.target.value })}></input>
            </div>
        </div>
        <div className='row'>
            <div className="input blue col last">
                <label>Support</label>
                <input type="text" onChange={e => setheroData({ ...heroData, 'supTeamBlue': e.target.value })}></input>
            </div>
            <div className="input red col last">
                <label>Support</label>
                <input type="text" onChange={e => setheroData({ ...heroData, 'supTeamRed': e.target.value })}></input>
            </div>
        </div>
        <div className='pos-block text-center'>
            <label>Position you want to predict : </label>
            <select className='pos' defaultValue="nothing" onChange={e => setheroData({ ...heroData, 'predict': e.target.value })}>
                <option value="nothing">-Select-</option>
                <option value="carryTeamBlue">Carry</option>
                <option value="mageTeamBlue">Mage</option>
                <option value="jungleTeamBlue">Jungle</option>
                <option value="offTeamBlue">Off Lane</option>
                <option value="supTeamBlue">Support</option>
            </select>
        </div>
        <div className="text-center">
            <button type='submit' className='btn btn-secondary' onClick={e => handleFormSubmit(e)}>submit</button>
        </div>
    </form>
}

export default Forminput