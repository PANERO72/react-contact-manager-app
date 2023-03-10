import React from 'react';
import './Spinner.css';

function Spinner() {
  return (
    <>
    <div className="container">
		<div id="floatingCirclesG">
			<span>Cargando...</span>
			<div className="f_circleG" id="frotateG_01"></div>
			<div className="f_circleG" id="frotateG_02"></div>
			<div className="f_circleG" id="frotateG_03"></div>
			<div className="f_circleG" id="frotateG_04"></div>
			<div className="f_circleG" id="frotateG_05"></div>
			<div className="f_circleG" id="frotateG_06"></div>
			<div className="f_circleG" id="frotateG_07"></div>
			<div className="f_circleG" id="frotateG_08"></div>
		</div>
	</div>
    </>
  )
}

export default Spinner;