import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../../Components/Spinner/Spinner';
import { ContactService } from '../../Services/ContactService';
import './CreateContact.css';

function CreateContact() {
	//const [visibleImage, setVisibleImage] = useState(false);
	//const [srcImge, setSrcImage] = useState('/assets/img/contacts/default-user-photo.png');

	//const [showHelpText, setShowHelpText] = useState(false);

	let navigate = useNavigate();

	let [state, setState] = useState({
		loading: false, contact: {
			id: "",
			name: "",
			photoURL: "",
			mobile: "",
			phone: "",
			email: "",
			groupId: "",
			address: "",
			company: "",
			importantDate: "",
			webSite: ""
		}, groups: [], errorMessages: null, response_error: null
	});

	// let showHelpTexts = () => {
	// 	setShowHelpText(true);
	// }

	// let hideHelpTexts = () => {
	// 	setShowHelpText(false);
	// }

	// let callFuntions =(event) =>{
	//  	updateInputs(event);
	//  	changeImage(event);
	// }

	let updateInputs = (event) => {
		setState({...state, contact: {
			...state.contact, [event.target.name] : event.target.value
		}});
		//setVisible(false);
		//setSrcImage(event.target.value)
	}

	let resetForm = () => {
		setState({...state, contact: {
			id: "",
			name: "",
			photoURL: "",
			mobile: "",
			phone: "",
			email: "",
			groupId: "",
			address: "",
			company: "",
			importantDate: "",
			webSite: ""
		}})
	}

	// let changeImage = (event) => {
	//  	console.log('Inagen cambiada');
	//  	setVisible(true);
	// 	setSrcImage(event.target.value);
	// }
	// let defaultImage = () => {
	// 	setVisible(false);
	// }

	const loadGroups = useCallback(async () => {
		try {
			setState({...state, loading: true});
			let response = await ContactService.getAllGroups();
			setState({...state, loading: false, groups: response.data});
			console.log(response.data);
		} catch (error) {
			setState({...state, loading: false, errorMessages: error.message});
		}
	},[]);

	useEffect(() => {
		loadGroups();
	},[]);

	let createContact = async (event) => {
		event.preventDefault();
		try {
			let response = await ContactService.createContact(state.contact);
			if (response) {
				navigate('/contacts/list', {replace: true});
			}
		} catch (error) {
			setState({...state, errorMessages: error.message});
			navigate('/contacts/create', {replace: false});
		}
	}

 	let {loading, contact, groups, errorMessages} = state;
  	return (
		<>
		<div className='mt-4 CreateContact-hg-805'>
			<section className='create-contact-header'>
				<div className="container-fluid mx-auto CreateContact-wd-80">
					<div className="row">
						<div className="col">
							<h3 className="">Agregar Contacto</h3>
						</div>
					</div>
					<div className="d-flex my-3">
						<p className=" fst-italic text-black-50">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis voluptatibus tenetur architecto exercitationem eveniet iusto nisi perferendis et recusandae soluta quidem impedit, assumenda reprehenderit ex cumque odio laborum! Nemo, perspiciatis. Reiciendis eos ab assumenda voluptates esse velit eligendi, illum ullam beatae suscipit, ducimus eius! Sequi doloremque earum tenetur ullam, autem praesentium nesciunt.</p>
					</div>
				</div>	
			</section>
			{loading ? <Spinner></Spinner> : <section className='create-contact-form'>
				<div className="container-fluid mx-auto CreateContact-wd-80">
					<div className="row my-5 CreateContact-mx-8">
						<div className="col-md-9 mx-auto border p-3 bg-light bg-opacity-50">
							<form className="" onSubmit={createContact}>
								<div className="row mb-3 CreateContact-pr-0">
									<div className="col CreateContact-wd-170 CreateContact-pr-0">
										<label htmlFor="name" className="col-form-label">Nombre y apellidos:</label>
									</div>
									<div className="col CreateContact-wd-382 CreateContact-pl-0"> {/* CreateContact-wd-550 */}
										<input type="text" className="form-control" name="name" value={contact.name} onChange={updateInputs} id="name"  aria-describedby="nameHelpBlock" maxLength={150} pattern="([a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]{2,60}[\,\-\.]{0,1}[\s]{0,1}){1,4}" required />
										<small id="nameHelpBlock" className="form-text text-muted passwordHelpBlock1">
											Los nombres no pueden tener menos de 2 letras.
										</small>
									</div>
									<div className="col CreateContact-wd-170 CreateContact-pr-0"> {/* CreateContact-wd-170 */}
										<label htmlFor="photoURL" className="col-form-label">Ruta Fotografía:</label>
									</div>
									<div className="col CreateContact-wd-334 CreateContact-pl-0"> {/*CreateContact-wd-324 */}
										<input type="text" className="form-control" name="photoURL" value={contact.photoURL} onChange={updateInputs} id="photoURL" aria-describedby="photoHelpBlock" required />
										<small id="photoHelpBlock" className="form-text text-muted passwordHelpBlock1">
											Ej.: /ruta-foto/photo.png o http://ruta-foto/photo.png.
										</small>
									</div>
									{/* **** ESTAS IMAGENES SON PARA ALTERNARLAS ****** */}
									{/* ******************** */}
									{/* {visible ? <div className="col CreateContact-wd-65 CreateContact-pl-0">
										<img src={srcImge} className="CreateContact-card-imagen rounded-start" alt="Foto contacto" />
									</div> : <div className="col CreateContact-wd-65 CreateContact-pl-0">
										<img src="/assets/img/contacts/default-user-photo.png" className="CreateContact-card-imagen rounded-start" alt="Foto contacto" />
									</div>} */}
									{/* <div className="col CreateContact-wd-65 CreateContact-pl-0">
										<img src={srcImge} className="CreateContact-card-imagen rounded-start" alt="Foto contacto" />
									</div> */}
									
									{/* ********************* */}
								</div>
								<div className="row mb-3 CreateContact-pr-0">
									<div className="col CreateContact-wd-170 CreateContact-pr-0">
										<label htmlFor="mobile" className="col-form-label">Teléfono móvil:</label>
									</div>
									<div className="col CreateContact-wd-600 CreateContact-pl-0">
										<input type="tel" className="form-control" name="mobile" value={contact.mobile} onChange={updateInputs} id="mobile" pattern='((?:[1-9][0-9 ().-]{5,28}[0-9])|(?:(00|0)( ){0,1}[1-9][0-9 ().-]{3,26}[0-9])|(?:(\+)( ){0,1}[1-9][0-9 ().-]{4,27}[0-9]))' required />
									</div>
									<div className="col CreateContact-wd-170 CreateContact-pr-0">
										<label htmlFor="phone" className="col-form-label">Teléfono fijo:</label>
									</div>
									<div className="col CreateContact-wd-600 CreateContact-pl-0">
										<input type="tel" className="form-control" id="phone" name="phone" value={contact.phone}  onChange={updateInputs} pattern="[+]{1}(?:[0-9\-\(\)\/\.]\s?){6, 15}[0-9]{1}" required />
									</div>
								</div>
								<div className="row mb-3 CreateContact-pr-0">
									<div className="col CreateContact-wd-170 CreateContact-pr-0">
										<label htmlFor="email" className="col-form-label">Correo electrónico:</label>
									</div>
									<div className="col CreateContact-wd-600 CreateContact-pl-0">
										<input type="email" className="form-control" id="email" name="email" value={contact.email} onChange={updateInputs} required />
									</div>
									<div className="col CreateContact-wd-170 CreateContact-pr-0">
										<label htmlFor="groupId" className="col-from-label">Grupo:</label>
									</div>
									<div className="col CreateContact-wd-600 CreateContact-pl-0">
										<select name="groupId" id="groupId" value={contact.groupId} onChange={updateInputs} className="form-select" required>
											<option className="">-- Seleccione un grupo --</option>
											{groups.length > 0 && groups.map(group => {
												return (
													<option key={group.id} value={group.id}>{group.name}</option>
												)
											})}
										</select>
									</div>
								</div>
								<div className="row mb-3 CreateContact-pr-0">
									<div className="col CreateContact-wd-170 CreateContact-pr-0">
										<label htmlFor="address" className="col-form-label">Dirección:</label>
									</div>
									<div className="col CreateContact-wd-600 CreateContact-pl-0">
										<input type="text" name="address" id="address" value={contact.address} onChange={updateInputs} className="form-control" required />
									</div>
									<div className="col CreateContact-wd-170 CreateContact-pr-0">
										<label className="form-check-label" htmlFor="company">Empresa:</label>
									</div>
									<div className="col CreateContact-wd-600 CreateContact-pl-0">
										<input type="text" name="company" id="company" value={contact.company} onChange={updateInputs} className="form-control" required />
									</div>
								</div>
								<div className="row mb-3 CreateContact-pr-0">
									<div className="col CreateContact-wd-170 CreateContact-pr-0">
										<label htmlFor="importantDate" className=" col-form-label">Fecha importante:</label>
									</div>
									<div className="col CreateContact-wd-600 CreateContact-pl-0">
										<input type="text" name="importantDate" id="importantDate" value={contact.importantDate}  onChange={updateInputs} className="form-control" required />
									</div>
									<div className="col CreateContact-wd-170 CreateContact-pr-0">
										<label className="form-check-label" htmlFor="webSite">Sitio web/blog:</label>
									</div>
									<div className="col CreateContact-wd-600 CreateContact-pl-0">
										<input type="url" name="webSite" id="webSite" value={contact.webSite} onChange={updateInputs} className="form-control" aria-describedby="webSiteHelpBlock" pattern='((http|https)\:\/\/|)([\w|\-]+\.)+\w+($|[\w\-\/\.]+$|[\w\/\.]+\?[\w\=\&\.]+$)' required />
										<small id="webSiteHelpBlock" className="form-text text-muted passwordHelpBlock1">
											Ej.: http://www.mi-blog.com o www.mi-blog.com.
										</small>
									</div>
								</div>
								<div className='CreateContact-pr-0 d-flex justify-content-start'>
									<button type="submit" className="btn btn-success me-2">Agregar</button>
									<button type="reset" className='btn btn-primary' onClick={resetForm}>Borrar</button>
								</div>
							</form>
						</div>
					</div>
					<div className="row my-5 mx-8">
						<div className="col-md-9 mx-auto">
							<Link to="/" className="btn btn-secondary"><i className="fa fa-arrow-alt-circle-left"></i> Volver</Link>
						</div>
					</div>
				</div>
			</section>}
			
		</div>
		</>
  	)
}

export default CreateContact;