import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../Components/Spinner/Spinner';
import { ContactService } from '../../Services/ContactService';
import './EditContact.css';

function EditContact() {
	let {contactId} = useParams();

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

	const loadContact = useCallback(async () => {
		try {
			setState({...state, loading: true});
			let response = await ContactService.getContact(contactId);
			let groupsResponse = await ContactService.getAllGroups();
			setState({...state, loading: false, contact: response.data, groups: groupsResponse.data});
			console.log(response.data);
		} catch (error) {
			setState({...state, loading: false, errorMessages: error.message});
		}
	},[contactId]);

	useEffect(() => {
		loadContact();
	},[contactId]);

	let updateInputs = (event) => {
		setState({...state, contact: {
			...state.contact, [event.target.name] : event.target.value
		}});
	}

	let editContact = async (event) => {
		event.preventDefault();
		try {
			let response = await ContactService.updateContact(state.contact, contactId);
			if (response) {
				navigate('/contacts/list', {replace: true});
			}
		} catch (error) {
			setState({...state, errorMessages: error.message});
			navigate(`/contacts/edit${contactId}`, {replace: false});
		}
	}

	let {loading, contact, groups, errorMessages} = state;

	return (
		<>
		<div className='mt-4 EditContact-hg-805'>
			<section className='create-contact-header'>
				<div className="container-fluid mx-auto EditContact-wd-80">
					<div className="row">
						<div className="col">
							<h3 className="">Editar Contacto</h3>
						</div>
					</div>
					<div className="d-flex my-3">
						<p className="fst-italic text-black-50">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis voluptatibus tenetur architecto exercitationem eveniet iusto nisi perferendis et recusandae soluta quidem impedit, assumenda reprehenderit ex cumque odio laborum! Nemo, perspiciatis. Reiciendis eos ab assumenda voluptates esse velit eligendi, illum ullam beatae suscipit, ducimus eius! Sequi doloremque earum tenetur ullam, autem praesentium nesciunt.</p>
					</div>
				</div>	
			</section>
			{loading ? <Spinner></Spinner> : <section className='create-contact-form'>
				<div className="container-fluid mx-auto EditContact-wd-80">
					{contact ? <><div className="row my-5 EditContact-mx-8">
						<div className="col-md-9 mx-auto border p-3 bg-light bg-opacity-50">
							<form className="" onSubmit={editContact}>
								<div className="row mb-3 EditContact-pr-0">
									<div className="col EditContact-wd-170 EditContact-pr-0">
										<label htmlFor="name" className="col-form-label">Nombre y apellidos:</label>
									</div>
									<div className="col EditContact-wd-600 EditContact-pl-0">
										<input type="text" className="form-control" name="name" value={contact.name} onChange={updateInputs} id="name" pattern="([a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]{2,60}[\,\-\.]{0,1}[\s]{0,1}){1,4}" />
									</div>
									<div className="col EditContact-wd-164 EditContact-pr-0">
										<label htmlFor="photoURL" className="col-form-label">Fotografía:</label>
									</div>
									<div className="col EditContact-wd-320 EditContact-pl-0 pr-0">
										<input type="text" name="photoURL" value={contact.photoURL} onChange={updateInputs} id="photoURL" className="form-control" />
									</div>
									{/* **** ESTAS IMAGENES SON PARA ALTERNARLAS ****** */}
									{/* <div className="col EditContact-wd-80 EditContact-pl-0">
										<img src="contact.photoURL" className="EditContact-card-imagen rounded-start" alt="Foto contacto" />
									</div> */}
									{/* ******************** */}
									<div className="col EditContact-wd-65 EditContact-pl-0">
										<img src={contact.photoURL} className="EditContact-card-imagen rounded-start" alt="Foto contacto" />
									</div>
									{/* ********************* */}
								</div>
								<div className="row mb-3 EditContact-pr-0">
									<div className="col EditContact-wd-170 EditContact-pr-0">
										<label htmlFor="mobile" className="col-form-label">Teléfono móvil:</label>
									</div>
									<div className="col EditContact-wd-600 EditContact-pl-0">
										<input type="tel" className="form-control" name="mobile" value={contact.mobile} onChange={updateInputs} id="mobile" />
									</div>
									<div className="col EditContact-wd-170 EditContact-pr-0">
										<label htmlFor="phone" className="col-form-label">Teléfono fijo:</label>
									</div>
									<div className="col EditContact-wd-600 EditContact-pl-0">
										<input type="tel" className="form-control" id="phone" value={contact.phone} onChange={updateInputs} name="phone" />
									</div>
								</div>
								<div className="row mb-3 pr-0">
									<div className="col EditContact-wd-170 EditContact-pr-0">
										<label htmlFor="email" className="col-form-label">Correo electrónico:</label>
									</div>
									<div className="col EditContact-wd-600 EditContact-pl-0">
										<input type="email" className="form-control" id="email" value={contact.email} onChange={updateInputs} name="email" />
									</div>
									<div className="col EditContact-wd-170 EditContact-pr-0">
										<label htmlFor="grouoId" className="col-from-label">Grupo:</label>
									</div>
									<div className="col EditContact-wd-600 EditContact-pl-0">
										<select name="grouoId" id="grouoId" className=" form-select" value={contact.groupId} onChange={updateInputs}>
											<option value="" className="">-- Seleccione un grupo --</option>
											{groups.length > 0 && groups.map(group => {
												return (
													<option key={group.id} value={group.id}>{group.name}</option>
												)
											})}
										</select>
									</div>
								</div>
								<div className="row mb-3 EditContact-pr-0">
									<div className="col EditContact-wd-170 EditContact-pr-0">
										<label htmlFor="address" className="col-form-label">Dirección:</label>
									</div>
									<div className="col EditContact-wd-600 EditContact-pl-0">
										<input type="text" name="address" id="address" value={contact.address} onChange={updateInputs} className="form-control" />
									</div>
									<div className="col EditContact-wd-170 EditContact-pr-0">
										<label className="form-check-label" htmlFor="company">Empresa:</label>
									</div>
									<div className="col EditContact-wd-600 EditContact-pl-0">
										<input type="text" name="company" id="company" value={contact.company} onChange={updateInputs} className="form-control" />
									</div>
								</div>
								<div className="row mb-3 EditContact-pr-0">
									<div className="col EditContact-wd-170 EditContact-pr-0">
										<label htmlFor="importantDate" className=" col-form-label">Fecha importante:</label>
									</div>
									<div className="col EditContact-wd-600 EditContact-pl-0">
										<input type="text" name="importantDate" id="importantDate" value={contact.importantDate} onChange={updateInputs} className="form-control" />
									</div>
									<div className="col EditContact-wd-170 EditContact-pr-0">
										<label className="form-check-label" htmlFor="webSite">Sitio web/blog:</label>
									</div>
									<div className="col EditContact-wd-600 EditContact-pl-0">
										<input type="url" name="webSite" id="webSite" className="form-control" pattern='(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})' value={contact.webSite} onChange={updateInputs} />
									</div>
								</div>
								<div className='CreateContact-pr-0 d-flex justify-content-start'>
									<button type="submit" className="btn btn-success me-2">Actualizar</button>
								</div>
							</form>
						</div>
					</div>
					<div className="row my-5 mx-8">
						<div className="col-md-9 mx-auto">
							<Link to="/" className="btn btn-secondary"><i className="fa fa-arrow-alt-circle-left"></i> Volver</Link>
						</div>
					</div></>: <div className="row my-5 mx-auto text-center">
						<h4>No hay Contactos guardados todavía</h4>
					</div>}
					
				</div>
			</section>}
		</div>
		</>
	)
}

export default EditContact;