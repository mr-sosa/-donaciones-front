import React from 'react'
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";
import Select from 'react-select';
import referal from '../assets/referal.json'
import careers from '../assets/careers.json'
import exps from '../assets/exps.json'
import '../styles/Form.css'
import conf from '../config.json'
import AgeAlert from './AgeAlert';

const fetch = require('node-fetch');

const url = conf.backURL + conf.port
let universities = {}
let referals = {}
let why = {}
let studyLevels = {}
let startDates = {}
let destinies = {}
let proXPs = []
let subprosGt = []

let error = ""

class Form extends React.Component{    
    constructor(props){
        super(props)
        this.state = {
            form:{
                name:       {value: ''},
                lastName:   {value: ''},
                email:      {value: ''},
                pass:       {value: ''},
                phone:      {value: ''},
                university: {value: ''},
                age:        {value: ''},
                studyLevel: {value: ''},
                startdate:  {value: ''},
                destiny:    {value: ''},
                exp:        {value: ''},
                referal:    {value: ''},
                prom_code:  {value: ' '},
                lc:         {value: ''},
                career:     {value: ''},
                englishLevel:{value: ''},
                proExp:     {value:''},
                subproGt:   {value:''},
                selected_program: {value: ''},
                utm_source: {value: '' },
                utm_medium: {value: '' },
                utm_campaign: {value: ''},
                utm_term: {value: ''},
                utm_content: {value: ''}
            },
            title : '',
            className : '',
            params: ' ',
            referral: ' ',
            program: this.props.program,
            loading: true,
            arrUniversities: [],
            arrRefs: [],
            arrExps: [],
            arrCars: [],
            arrProXp: [],
            arrSubProGt: [],
            arrStudyLevels: [],
            arrStartDates: [],
            arrDestinies: [],
            error: 0,
            check: false,
            step: 1
        };
        
        this.changeHandler = this.changeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.prevStep = this.prevStep.bind(this);
	    this.isRegistering = false;
    }    
    
    componentDidMount() {
        // Se separan todos los parametros que hayan llegado por URL
        let params  = this.props.location.search
        let tform   = this.state.form   
        let pars    = params.substring(1).split('&')
        let arg     = ""
        let val     = ""
        let prog    = ""
        let ref     = ""

        // Acá solo identifica que programa es según el parametro /?form=##
        pars.map(par => {
            arg = par.split('=')[0]
            val = par.split('=')[1]
            prog = (arg === "form") ? val : prog
            ref = (arg === "referral") ? val: ref
        })      
        
        ref = ref.replace(/%10/g, ", ").replace(/%20/g, " ").replace(/%C3%B3/g, "ó");
        this.setState({referral : ref});
        
        // Se cargan atributos unicos por programa en el estado de la pag
        switch (prog) {
            case "gv":
                tform.selected_program = { value: "GV" }
                this.setState({
                    form: tform,
                    program: "gv",
                    title: "Regístrate",
                    className: "titleGV"
                })
                break;
            case "gt":
                    tform.selected_program = { value: "GTa" }
                    this.setState({
                        form: tform,
                        program: "gt",
                        title: "Regístrate",
                        className: "titleGT"
                    })
                break;
            default:
                break;
        }

        this.fetchData() // Se llaman los datos de los dropdown desde el back
    }
    
    //Llama los datos que estan en un servicio externo para mostrarlos en los dropdown
    fetchData = async () => {        
        this.setState({
            loading: true,
            error: null
        })        
        try {
            //Llama los datos para alimentar los dropdown
            universities = await fetch(url+"/universities").then(res => res.json()) 
            universities = universities.filter( (item, pos) => universities.indexOf(item) === pos)
            referals = await fetch(url+"/referals?pg="+this.state.program).then(res => res.json())
            referals = referals.filter( (item, pos) => referals.indexOf(item) === pos)
            why     = await fetch(url+"/whys?pg="+this.state.program).then(res => res.json())
            why     = why.filter( (item, pos) => why.indexOf(item) === pos)
            studyLevels = await fetch(url+"/studylevels").then(res => res.json()) 
            studyLevels = studyLevels.filter( (item, pos) => studyLevels.indexOf(item) === pos)
            startDates = await fetch(url+"/startdates").then(res => res.json()) 
            startDates = startDates.filter( (item, pos) => startDates.indexOf(item) === pos)

            destinies = []
            if(this.state.program === "gv"){
                destinies = await fetch(url+"/destinies").then(res => res.json()) 
                destinies = destinies.filter( (item, pos) => destinies.indexOf(item) === pos)
            }
            proXPs = []
            subprosGt = []
            if(this.state.program === "gt"){
                proXPs = await fetch(url+"/proxp").then(res => res.json()) 
                proXPs = proXPs.filter( (item, pos) => proXPs.indexOf(item) === pos)
                subprosGt = await fetch(url+"/subprogt").then(res => res.json()) 
                subprosGt = subprosGt.filter( (item, pos) => subprosGt.indexOf(item) === pos)
            }
            //Cuando ya tiene los datos los guarda en los atributos estado de la pagina
            //Los datos de cada dropdown deben quedar en un arreglo            
            this.setState({
                loading: false,
                arrUniversities: universities.sort(),
                lc: universities,
                arrRefs: referals,
                arrExps: why,
                arrCars: careers.cars,
                arrProXp:proXPs,
                arrSubProGt:subprosGt,
                arrStudyLevels: studyLevels,
                arrStartDates: startDates,
                arrDestinies: destinies
            })
        } catch (error) {
            this.setState({
                loading: false,
                error: error
            })
        }
    }   

    handleSubmit = async e => {
        e.preventDefault();
	if(!this.isRegistering){
        
        let tform = this.state.form
        // -------- Parametros UTM --------
        // Lee todos los parametros que estén en la URL para enviarlos al back
        let params = this.props.location.search
        let pars = params.substring(1).split('&')
        let arg = ""
        let val = ""
        let prog = ""
        let utm_source = " "
        let utm_medium = " "
        let utm_campaign = " "
        let utm_term = " "
        let utm_content = " "

        pars.map(par => {
            arg = par.split('=')[0]
            val = par.split('=')[1]
            prog = (arg === "form") ? val : prog
            utm_source = (arg === "utm_source") ? val : utm_source
            utm_medium = (arg === "utm_medium") ? val : utm_medium
            utm_campaign = (arg === "utm_campaign") ? val : utm_campaign
            utm_term = (arg === "utm_term") ? val : utm_term
            utm_content = (arg === "utm_content") ? val : utm_content
        })

        tform.utm_source.value = utm_source 
        tform.utm_medium.value = utm_medium 
        tform.utm_campaign.value = utm_campaign
        tform.utm_term.value = utm_term
        tform.utm_content.value = utm_content
        // ------- Fin parametros UTM --------
        
        if(this.state.referral !== ""){
            this.state.form.referal.value = this.state.referral;
        }

        // Validaciones
        let uni = this.state.form.university.value
        let exp = this.state.form.exp.value
        let llg = this.state.form.referal.value
        let deg = this.state.form.career.value
        let studLevel = this.state.form.studyLevel.value
        let dest = this.state.form.destiny.value
        let startDate = this.state.form.startdate.value
        let eng =  this.state.form.englishLevel.value
        let pXp = this.state.form.proExp.value
        let subP = this.state.form.subproGt.value
        
        eng = (eng=== "Nivel de Inglés") ? "" : eng;
        pXp = (pXp === "Experiencia profesional") ? "" : pXp;
        subP = (subP === "¿En qué campo te gustaría vivir tu experiencia?") ? "" : subP
        uni = (uni === "Ciudad o Universidad") ? "" : uni
        exp = (exp === "Quiero vivir mi experiencia porque...") ? "" : exp
        llg = (llg === "¿Cómo te enteraste de nosotros?") ? "" : llg
        deg = (deg === "Carrera") ? "" : deg
        studLevel = (studLevel === "Nivel de estudio") ? ""  : studLevel;
        dest =(dest === "El país que me gustaría conocer es...")? "" : dest;
        startDate = (startDate === "¿Cuándo quieres vivir tu experiencia?")? "" : startDate;
        // Fin validaciones
        if(this.state.program==="gt"&&subP==="Enseñanza y afines"){
            tform.selected_program.value="GTe";
        }
        this.setState({ tform }); // Carga todos los datos del formulario

        if( uni === "" || exp === "" || llg === "" || deg === "" || studLevel === "" ||
            (this.state.program==="gv" && dest === "") || (this.state.program === "gt"&& ( eng ==="" || pXp === "" || subP === "") ) || startDate === "" ){
            error = "Debes llenar todos los campos."
            this.setState({error: 2})
        }
        else {
            let getURL = url + '/su'
            
            // Envía el formulario
	    this.isRegistering = true;
	    this.setState({check: true})
            await fetch(getURL, {
                method: 'POST',
                mode: 'cors',            
                body: JSON.stringify({...this.state.form}),
                headers: 
                    {'Accept': 'application/json', 'Content-Type': 'application/json; charset=UTF-8"'},
            }).then(res => {    
                if(res.status == 422){ // Manejo de errores desde EXPA
                    error = <p>Este correo ya se encuentra registrado, <a href="https://auth.aiesec.org/users/sign_in#login">inicia sesión aquí.</a></p>
                    this.setState({error: 2, check:false})
		    this.isRegistering = false;
                }else{
                    this.setState({error: 1, check: true})
                    this.isRegistering = true;
                    error = "Te has registrado exitosamente."
                    let redirect_url = "https://aiesec.org/search"
                    if(this.state.program === "gt"){
                        redirect_url ="https://aieseccolombia.org/talento-gracias"
                    }else{
                        redirect_url ="https://aieseccolombia.org/voluntario-gracias"
                    }
                    window.top.location.href  = redirect_url // Si el registro fue exitoso redirecciona a aiesec.org/search
                }
            })
            .catch(err => { // Manejo de errores desde el servidor back
                error = "Ha ocurrido un error, intentalo de nuevo más tarde."
                this.setState({error: 2})
            })
        }
	}
    }         

    // Esta función se encarga de leer los cambios en el formulario en cada cambio que le haga el usuario
    // Los datos quedan en las variables estado de la pagina
    changeHandler = event => {      
        if(event.target){
            const name = event.target.name;
            const value = event.target.value;    
                        
            this.setState({
            form: {
                ...this.state.form,
                [name]: {
                ...this.state.form[name],
                value
                }
            },
            error: 0
            });

            if(name === "pass"){
                this.setState({error: 3})
                error = "La contraseña debe:"
            }
        }else{
            let value = event.value
            this.setState({
                form: {
                    ...this.state.form,
                    [event.type]: {
                    ...this.state.form[event.type],
                    value
                    }
                },
                error: 0
                });
        }
    }

    nextStep = (event) =>{
        
        let nombre =  this.state.form.name.value;
        let apellido = this.state.form.lastName.value;
        let cel = this.state.form.phone.value;
        let age = this.state.form.age.value;
        let mail = this.state.form.email.value;
        let pass = this.state.form.pass.value;
        let uni = this.state.form.university.value;
        uni = (uni === "Ciudad o Universidad") ? "" : uni

        if( uni === "" || nombre === "" || apellido === "" || cel === "" || age === 0 || age === "" || mail === "" || pass === ""){
            error = "Debes llenar todos los campos."
            this.setState({error: 2})
        }else if(!(/\d/.test(pass))){
            error = "La contraseña debe: tener al menos un número" 
            this.setState({error: 2})
        }else if(!(/[a-z]/.test(pass))){
            error = "La contraseña debe: tener al menos una letra en minúscula" 
            this.setState({error: 2})
        }else if(!(/[A-Z]/.test(pass))){
            error = "La contraseña debe: tener al menos una letra en mayúscula" 
            this.setState({error: 2})
        }else if(!(/.{8,}/.test(pass))){
            error = "La contraseña debe: tener mínimo 8 caracteres" 
            this.setState({error: 2})
        }else{
            let dob = age.split("-");
            let dStart = new Date(dob[1]+"/"+dob[2]+"/"+dob[0]);
            let dToday = new Date();
            dob = Math.abs(dToday-dStart)/(1000*60 * 60 * 24*30*12)
            if (parseInt(dob) > 30 || parseInt(dob) <18){
            this.setState({step:3, error: 0});
            }else{
            this.setState({step:2, error:0});
            }
        }
        
    }

    prevStep = (event) =>{
        this.state.form.pass.value = "";
        this.state.form.age.value = "";
        this.setState({step:1, error:0})
    }

    render() {
        const getParams = ""
        let code = ""
        if(getParams === "yes")
            code = <input  type="input"
                    className="form-control"
                    name="prom_code"
                    placeholder="Código de promoción"
                    pattern="[0-9]*$"
                    onChange={this.changeHandler} />
                
        
        if(this.state.loading === true){
            return 'Loading Universities...'
        }
        
        let listUs = [];
        this.state.arrUniversities.map(opt => (
            listUs.push({ label: opt, value: opt})
            ));

        let listRfs = "";
        let opRfs = "";
        if(this.state.referral === ""){
            listRfs = this.state.arrRefs;
            opRfs = listRfs.map( u => 
                <option key={u}>{u}</option>
            )
        }

        let listXps = this.state.arrExps;
        let opXps = listXps.map( u => 
            <option key={u}>{u}</option>
        )
        opXps.pop();

        let listCars = [] 
        this.state.arrCars.map(opt => (
            listCars.push({ label: opt, value: opt})
        ));

        let listStud = this.state.arrStudyLevels;
        let opStud = listStud.map( u => 
            <option key={u}>{u}</option>
        )

        let listSta = this.state.arrStartDates;
        let opSta = listSta.map( u => 
            <option key={u}>{u}</option>
        )
        let listDest = null;
        let opDest = null;
        if (this.state.program === "gv"){
            listDest = this.state.arrDestinies;
            opDest = listDest.map( u => 
                <option key={u}>{u}</option>
            )
            opDest.pop();
        }
        let opProXp = null;
        let opSubproGt = null;
        if (this.state.program === "gt"){
            let list = this.state.arrProXp;
            opProXp = list.map( u => 
                <option key={u}>{u}</option>
            )
            opProXp.pop();
            list = this.state.arrSubProGt;
            opSubproGt = list.map( u => 
                <option key={u}>{u}</option>
            )
            opSubproGt.pop();
        }

        let engLvl = ""
        let gte = this.state.program === "gt"     

        if( gte ){
            engLvl = <div style={{width:"100%"}}>
                    <div className="form-group col-md-12">
                        <select className="form-control"
                            name="englishLevel"
                            onChange={this.changeHandler}>  
                            <option  defaultValue>Nivel de Inglés</option>
                            <option>Básico</option>
                            <option>Intermedio</option>
                            <option>Avanzado</option>
                            <option>Fluido</option>
                            <option>No hablo inglés</option>
                        </select>
                    </div>
                    <div className="form-group col-md-12">
                        <select className="form-control"
                            name="proExp"
                            onChange={this.changeHandler}>  
                            <option  defaultValue>Experiencia profesional</option>
                            {opProXp}
                        </select>
                    </div>
                    <div className="form-group col-md-12">
                        <select className="form-control"
                            name="subproGt"
                            onChange={this.changeHandler}>  
                            <option  defaultValue>¿En qué campo te gustaría vivir tu experiencia?</option>
                            {opSubproGt}
                        </select>
                    </div>
                </div>
        }
        let dest = ""
        if (this.state.program === "gv"){
            dest = <div className="form-group col-md-12">
                <select className="form-control"
                name="destiny"
                onChange={this.changeHandler}>  
                    <option default>El país que me gustaría conocer es...</option>                          
                    {opDest}
                </select>
            </div>
        }

        let err = this.state.error
        
        switch (err) {
            case 0:
                alert = ""  
            break;
            case 1:
                alert = <div className="alert alert-success" role="alert">
                {error}
                </div>    
            break;
            case 2:
                alert = <div className="alert alert-danger" role="alert">
                {error}
                </div>
            break;
            case 3:
                alert = <div className="alert alert-warning" role="alert">
                {error}
                    <ul>
                        <li>Tener mínimo 8 caracteres.</li>
                        <li>Al menos una letra minúscula.</li>
                        <li>Al menos una letra mayúscula.</li>
                        <li>Al menos un dígito.</li>
                    </ul>
                </div>
            break;
        
            default:
                break;
        }


        let title = this.state.title
        let pName = this.state.form.name.value === "" ?"Nombre" : this.state.form.name.value;
        let pLast = this.state.form.lastName.value === "" ? "Apellido"  : this.state.form.lastName.value;
        let pMail = this.state.form.email.value === "" ? "Correo"  : this.state.form.email.value;
        let pPhone = this.state.form.phone.value === "" ? "Teléfono"  : this.state.form.phone.value;
        let pUni = this.state.form.university.value === "" ? "Ciudad o Universidad"  : this.state.form.university.value;

        let step1 = <div>
                    <MDBRow>  
                    <MDBCol md="6" className="mb-3">
                        <input  type="text" 
                                name="name"
                                className="form-control" 
                                placeholder={pName}
                                onChange={this.changeHandler}
                                required
                        />                            
                    </MDBCol>
                    <div className="form-group col-md-6">
                        <input  type="text" 
                                name="lastName"
                                className="form-control" 
                                placeholder={ pLast}
                                onChange={this.changeHandler}
                                required
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <input  type="email" 
                                name="email"
                                className="form-control" 
                                id="defaultFormRegisterEmailEx2"
                                placeholder={ pMail}
                                onChange={this.changeHandler}
                                required
                        />
                    </div>
                    
                    <div className="form-group col-md-6">
                        <input  type="password" 
                                name="pass"
                                className="form-control" 
                                id="inputPassword4" 
                                placeholder="Contraseña" 
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                onChange={this.changeHandler}
                                required
                        />
                    </div>
                    <div className="form-group col-md-6" style={{margin:"auto", color:"#6C757D",textAlign:"center"}}>
                        <label for="age">Fecha de nacimiento:</label>
                    </div>
                    <div className="form-group col-md-6">
                        <input  type="date"
                                id="age" 
                                name="age"
                                className="form-control" 
                                onChange={this.changeHandler}
                                required
                        />
                    </div>
                    <div className="form-group col-md-12">
                        <input  type="tel" 
                                name="phone"
                                className="form-control" 
                                placeholder={ pPhone}
                                pattern="^\d{3}\d{3}\d{4}$" 
                                onChange={this.changeHandler}
                                required
                        />
                    </div>
                    <div className="form-group col-md-12" >
                        <Select 
                        options={listUs}
                        name="university"
                        onChange={(opt)=>(
                            opt.type="university",
                            this.changeHandler(opt)
                            )}
                        placeholder= {pUni} 
                        required
                        >
                        </Select>
                    </div>
                    </MDBRow>
                    <MDBBtn className="col-md-12" color="primary" onClick={this.nextStep}>
                        Siguiente                  
                    </MDBBtn>
                    </div>
        let compRef = <div className="form-group col-md-12">
                        <select className="form-control"
                                name="referal"
                                onChange={this.changeHandler}>  
                            <option default>¿Cómo te enteraste de nosotros?</option>                          
                            {opRfs}
                        </select>
                    </div>
        let step2 = <div>
                    <MDBRow>


                    <div className="form-group col-md-12">
                        <Select 
                        options={listCars}
                        name="career"
                        onChange={(opt)=>(
                            opt.type="career",
                            this.changeHandler(opt)
                            )}
                        placeholder="Carrera"
                        required
                        >
                        </Select>
                    </div>

                    <div className="form-group col-md-12">
                        <select className="form-control"
                            name="studyLevel"
                            onChange={this.changeHandler}
                            required>  
                            <option  defaultValue>Nivel de estudio</option>                                        
                            {opStud}
                        </select>
                    </div>

                    <div className="form-group col-md-12">
                        <select className="form-control"
                                name="exp"
                                onChange={this.changeHandler}>  
                                <option default>Quiero vivir mi experiencia porque...</option>                          
                            {opXps}
                        </select>
                    </div>

                    {dest}

                    <div className="form-group col-md-12">
                        <select className="form-control"
                            name="startdate"
                            onChange={this.changeHandler}
                            required>  
                            <option  defaultValue>¿Cuándo quieres vivir tu experiencia?</option>                                        
                            {opSta}
                        </select>
                    </div>

                    {engLvl}

                    {(this.state.referral === "")? compRef : ""}
                    
                    <div className="form-group col-md-12">{code}</div>
                    </MDBRow>
                    <div className="form-group form-check">
                        <input type="checkbox" 
                                className="form-check-input"
                                id="exampleCheck1"
                                required
                                 />

                        <label className="form-check-label" htmlFor="exampleCheck1" required>
                            Estoy de acuerdo con los 
                        </label>
                        <a href="https://aieseccolombia.org/wp-content/uploads/2017/02/AVISO-DE-PRIVACIDAD-1.pdf"> términos y condiciones de privacidad</a>
                    </div>
                    <MDBBtn className="col-md-12" color="primary" disabled={this.state.check} type="submit">
                        Crear mi cuenta                    
                    </MDBBtn>
                    <div style={{height:"10px"}}/>
                    <MDBBtn className="col-md-12" color="secondary" onClick={this.prevStep}>
                        Regresar               
                    </MDBBtn>
                    <div style={{height:"10px"}}/>
                    </div>
        let show = "";
        switch (this.state.step) {
            case 1:
                show = step1;
                break;
        
            case 2:
                show = step2;
                break;
        }

        let form =  <div>
                    <div className="form-group container">
                        <h2 className="header" id={this.state.className}>{title}</h2>
                        <div className="col s12 m12">{this.props.desc}</div>
                    </div>     

                    <form onSubmit = {this.handleSubmit} >                    
                        {show}
                    </form> 
                    </div>;

        if(this.state.step === 3 ){
            if(this.state.program==="gv"){
                form=<AgeAlert id="TitleGV" > </AgeAlert>
            }else if(this.state.program === "gt"){
                form=<AgeAlert id="TitleGT" > </AgeAlert>
            }
        }

        return (
            <div>
                <div>{alert}</div>
                {form}
            </div>
        )
    };
}

export default Form;                
