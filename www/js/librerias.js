var ip='http://52.27.128.121/apede/app/';
//var ip='http://localhost:8080/apede_backend/';


function asistio(valor,id_company,id_contacts){

	if(valor==1){


		$.ajax({
			url:ip+'contacts.php',
			type:'POST',
			global:false,
			data:{tipo:4,id:id_company,id_company,accion:valor,id_contacts:id_contacts},
			dataType:'json',
			error:function(jqXHR,text_status,strError){
			alert('No hay Coneccion');
			console.log(jqXHR.status, strError);},
			timeout:60000,
			success:function(data){

					if(data['0']==1){
							
						alert('Asistencia Guardada!');						

					}

					if(data['0']==2){
							
						alert('Asistencia Eliminada!');						

					}
			}
			});

		
	}
	if(valor==0){alert('No Asistio!');}


}

function colocar_valor(valor){
	if(valor==0){
	$("#admin").val(1);}
	if(valor==1){
	$("#admin").val(0);}
	 
}
function recargar(){
	listar_eventos(); 
}

function salir_inicio(){
	location.reload(); 
}

function salir(){
        navigator.app.exitApp();
      }

function entrar()
{
	
	usu = $("#usuario").val();
	cla = $("#clave").val();


	var doc = document.form1;
	
		$.ajax({
			url:ip+'usuarios.php',
			type:'POST',
			global:false,
			data:{tipo:1,usuario:usu,clave:cla},
			dataType:'json',
			error:function(jqXHR,text_status,strError){
			alert('No hay Coneccion');
			console.log(jqXHR.status, strError);},
			timeout:60000,
			success:function(data){
					
					if(data['0']>0){
							
						$("#login").remove();	
						$("ion-spinner").remove();
						listar_eventos();
						

					}else{

						$("ion-spinner").remove();
						alert('NO EXISTEN USUARIO!');
						return 0;
					}
			}
			});
		
}

function guardar_invitado()
{
	
	evento = $("#evento").val();
	apellido = $("#apellido").val();
	nombre = $("#nombre").val();


	if(evento=="" || apellido=="" || nombre=="" ){
		alert('FALTA DATOS POR INGRESAR');
	}
	else{

	var doc = document.form1;
	
		$.ajax({
			url:ip+'contacts.php',
			type:'POST',
			global:false,
			data:{tipo:3,id:evento,nombre:nombre,apellido:apellido},
			dataType:'json',
			error:function(jqXHR,text_status,strError){
			alert('No hay Coneccion');
			console.log(jqXHR.status, strError);},
			timeout:60000,
			success:function(data){

					if(data['0']==1){
							
						alert('EL INVITADO FUE CREADO CON EXITO!');	
						buscar_log(evento);

					}
			}
			});
	}
		
}


function crear_usuario()
{
	
	usu = $("#usuario_add").val();
	cla = $("#clave_add").val();
	tip = $("#admin").val();
	nombre_usuario_add = $('#nombre_usuario_add').val();

	if(usu=="" || cla=="" || tip=="" || nombre_usuario_add ==""){
		alert('FALTA DATOS POR INGRESAR');
	}
	else{

	var doc = document.form1;
	
		$.ajax({
			url:ip+'usuarios.php',
			type:'POST',
			global:false,
			data:{tipo:2,usuario:usu,clave:cla,nombre_usu:nombre_usuario_add,tipo_usu:tip},
			dataType:'json',
			error:function(jqXHR,text_status,strError){
			alert('No hay Coneccion');
			console.log(jqXHR.status, strError);},
			timeout:60000,
			success:function(data){

					if(data['0']==1){
							
						alert('EL USUARIO FUE CREADO CON EXITO!');	
						listar_eventos();

					}
			}
			});
	}
		
}

function invitados(){
	
	if ($('#eventos').length){
		$("#eventos").remove();
	}
	if ($('#footer').length){
		$("#footer").remove();
	}

	if ($('#sal').length){
		$("#sal").remove();
	}
	if ($('#inv').length){
		$("#inv").remove();
	}
	if ($('#rec').length){
		$("#rec").remove();
	}
	if ($('#usu').length){
		$("#usu").remove();
	}
	if ($('#contacts').length){
		$("#contacts").remove();
	}


	$("#contenedor").append( "<div id='contacts'  class=''> </div>" );

	$("#contacts").append("<div id='invitados' class='list'><label class='item item-input'><input name='nombre' id='nombre' type='text' placeholder='Nombre de Invitado'></label><label class='item item-input'><input type='text' name='apellido' id='apellido' placeholder='Apellido de Invitado'></label><label class='item item-input'><button onclick='guardar_invitado()' class='button icon-left ion-log-in'>Guardar Invitado</button></div>");
	$("ion-footer-bar").append("<div id='rec' class='buttons' onclick='recargar();'><button class='button icon-left ion-navicon-round'>Eventos</button></div>");

	//$("#contacts").append("<ion-spinner icon='ripple'>Buscando</ion-spinner>");
		
}

function usuarios_add(){
	
	if ($('#eventos').length){
		$("#eventos").remove();
	}
	if ($('#footer').length){
		$("#footer").remove();
	}

	if ($('#sal').length){
		$("#sal").remove();
	}
	if ($('#inv').length){
		$("#inv").remove();
	}
	if ($('#rec').length){
		$("#rec").remove();
	}
	if ($('#usu').length){
		$("#usu").remove();
	}
	if ($('#c_usu').length){
		$("#c_usu").remove();
	}


	$("#contenedor").append( "<div id='contacts'  class=''> </div>" );

	$("#contacts").append("<div id='c_usu' class='list'><label class='item item-input'><input name='nombre_usuario_add' id='nombre_usuario_add' type='text' placeholder='Nombre de Usuario'></label><label class='item item-input'><input name='usuario_add' id='usuario_add' type='text' placeholder='Usuario'></label><label class='item item-input'><input type='password' name='clave_add' id='clave_add' placeholder='Clave'></label><label class='item item-input'><button onclick='crear_usuario()' class='button icon-left ion-log-in'>Crear Usuario</button></div>");
	$("#c_usu").append("<label class='item item-input'><button onclick='recargar()' class='button icon-left ion-log-out'>Salir</button></label>");
	$("#contacts").append("Administrador:<input id='admin' name='admin' onclick='colocar_valor(this.value);' value='0' type='checkbox'>");
	
	$("ion-footer-bar").append("<a id='aname'>Creacion de Usuario</a>");
	
	//$("ion-footer-bar").append("<div class='buttons' onclick='recargar();'><button class='button icon-left ion-navicon-round'>Eventos</button></div><div class='buttons' onclick='invitados();'><button class='button icon-left ion-person-add'>Invitados Nuevos</button></div><input type='hidden'  id='evento' name='evento' value='0'><div class='buttons' ng-click=''><button onclick='salir_inicio()' class='button icon-left ion-power'>Salir</button></div>");
	//$("#footer_son").append("<ion-footer-bar align-title='left' class='bar-stable'><div class='buttons' onclick='recargar();'><button class='button icon-left ion-navicon-round'>Eventos</button></div><div class='buttons' onclick='invitados();'><button class='button icon-left ion-person-add'>Invitados Nuevos</button></div><input type='hidden'  id='evento' name='evento' value='0'><div class='buttons' ng-click=''><button onclick='salir_inicio()' class='button icon-left ion-power'>Salir</button></div></ion-footer-bar>");
	//$("#footer_son").append("<div class='buttons' onclick='recargar();'><button class='button icon-left ion-navicon-round'>Eventos</button></div><div class='buttons' onclick='invitados();'><button class='button icon-left ion-person-add'>Invitados Nuevos</button></div><input type='hidden'  id='evento' name='evento' value='0'><div class='buttons' ng-click=''><button onclick='salir_inicio()' class='button icon-left ion-power'>Salir</button></div></ion-footer-bar>");
	//$("#contacts").append("<ion-spinner icon='ripple'>Buscando</ion-spinner>");
		
}

function login(){
	
	if ($('#eventos').length){
		$("#eventos").remove();
	}
	if ($('#footer').length){
		$("#footer").remove();
	}

	if ($('#sal').length){
		$("#sal").remove();
	}
	if ($('#inv').length){
		$("#inv").remove();
	}
	if ($('#rec').length){
		$("#rec").remove();
	}
	if ($('#usu').length){
		$("#usu").remove();
	}

	if ($('#c_usu').length){
		$("#c_usu").remove();
	}

	$("#contenedor").append( "<div id='contacts'  class=''> </div>" );

	$("#contacts").append("<div id='login' class='list'><label class='item item-input'><input name='usuario' id='usuario' type='text' placeholder='Usuario'></label><label class='item item-input'><input type='password' name='clave' id='clave' placeholder='Clave'></label><label class='item item-input'><button onclick='entrar()' class='button icon-left ion-log-in'>Ingresar</button></div>");
	$("#login").append("<label class='item item-input'><button onclick='salir()' class='button icon-left ion-log-out'>Salir</button></label>");
	
	$("ion-footer-bar").append("<a id='aname'>APEDE APP MOVIL</a>");
	
	//$("ion-footer-bar").append("<div class='buttons' onclick='recargar();'><button class='button icon-left ion-navicon-round'>Eventos</button></div><div class='buttons' onclick='invitados();'><button class='button icon-left ion-person-add'>Invitados Nuevos</button></div><input type='hidden'  id='evento' name='evento' value='0'><div class='buttons' ng-click=''><button onclick='salir_inicio()' class='button icon-left ion-power'>Salir</button></div>");
	//$("#footer_son").append("<ion-footer-bar align-title='left' class='bar-stable'><div class='buttons' onclick='recargar();'><button class='button icon-left ion-navicon-round'>Eventos</button></div><div class='buttons' onclick='invitados();'><button class='button icon-left ion-person-add'>Invitados Nuevos</button></div><input type='hidden'  id='evento' name='evento' value='0'><div class='buttons' ng-click=''><button onclick='salir_inicio()' class='button icon-left ion-power'>Salir</button></div></ion-footer-bar>");
	//$("#footer_son").append("<div class='buttons' onclick='recargar();'><button class='button icon-left ion-navicon-round'>Eventos</button></div><div class='buttons' onclick='invitados();'><button class='button icon-left ion-person-add'>Invitados Nuevos</button></div><input type='hidden'  id='evento' name='evento' value='0'><div class='buttons' ng-click=''><button onclick='salir_inicio()' class='button icon-left ion-power'>Salir</button></div></ion-footer-bar>");
	//$("#contacts").append("<ion-spinner icon='ripple'>Buscando</ion-spinner>");
		
}



function buscar_log_nombre_id()
{
	
	id = $("#evento").val();
	nombre = $("#nombre").val();


	var doc = document.form1;
	
		$.ajax({
			url:ip+'contacts.php',
			type:'POST',
			global:false,
			data:{id:id,nombre:nombre,tipo:2},
			dataType:'json',
			error:function(jqXHR,text_status,strError){
			alert('No hay Coneccion');
			console.log(jqXHR.status, strError);},
			timeout:60000,
			success:function(data){

					var eventos = data['0'];
					var id_evt;
					var name;

					
					if(data['0']>0)
					{
							
							if ($('#eventos').length){
								$("#eventos").remove();
							}

							if ($('#contacts').length){
								$("#contacts").remove();
							}

						name = data['lname'+con];
						$("#contenedor").append( "<div id='contacts'  class=''> </div>" );
						$("#contacts").append("<label  class='item item-input'><i class='icon ion-search placeholder-icon'></i><input id='nombre' autofocus name='nombre' value='"+nombre+"' type='search' placeholder='Search'></label>");
						$("#contacts").append("<div align='center'  class='buttons'><button  onclick='buscar_log_nombre_id()' class='button'>Buscar</button></div>");
						$("#contacts").append("<ion-spinner icon='ripple'>Buscando</ion-spinner>");


						
						var con=1;
						for(var i in data){
							if(data['id'+con]!=undefined){

								id_contacts = data['id'+con];
								$("#evento").val(data['company'+con]);
								id_conpany = data['company'+con];
								if(data['name'+con]!=null && data['lname'+con]!=null){

									
									var var_onclick =' onclick="asistio(1,'+"'"+id_conpany+"'"+','+"'"+id_contacts+"'"+');" ';


									name = data['name'+con]+' '+data['lname'+con];
									$( "#contacts" ).append( "<div id='data"+con+"'  class='list card'> </div>" );
									$( "#data"+con ).append( '<div id="div'+con+'" align="center" onclick="" class="item item-divider">'+name+'</div>' );
									$( "#div"+con ).append( "<label id='label"+con+"'   class='toggle toggle-assertive'>" );
									$( "#label"+con ).append( "<input id='ch"+con+"' "+ var_onclick +" type='checkbox'>" );
									$( "#label"+con ).append( "<div  id='tra"+con+"' align='right' class='track'>" );
									$( "#tra"+con ).append( "<div id='han"+con+"'  class='handle'>" );

								}
								
							}
							con=con+1;
						} 


						

						$("ion-spinner").remove();
							
						return 1;

					}else{

						// $('#loading').hide();
						$("ion-spinner").remove();
						alert('NO EXISTEN CONTACTOS CON ESE NOMBRE!');
						return 0;
					}
			}
			});
		
}


function buscar_log(id)
{
	var doc = document.form1;
	$.ajax({
		url:ip+'contacts.php',
		type:'POST',
		global:false,
		data:{id:id,tipo:1},
		dataType:'json',
		error:function(jqXHR,text_status,strError){
		alert('No hay Coneccion');
		console.log(jqXHR.status, strError);},
		timeout:60000,
		success:function(data){
			
				

				var eventos = data['0'];
				var id_evt;
				var name;
				
				if(data['0']>0)
				{
						if ($('#eventos').length){
							$("#eventos").remove();
						}
						if ($('#invitados').length){
							$("#invitados").remove();
						}
						if ($('#footer').length){
							$("#footer").remove();
						}

						if ($('#sal').length){
							$("#sal").remove();
						}
						if ($('#inv').length){
							$("#inv").remove();
						}
						if ($('#rec').length){
							$("#rec").remove();
						}
						if ($('#usu').length){
							$("#usu").remove();
						}

					
					$("#contenedor").append( "<div id='contacts'  class=''> </div>" );
					$("#contacts").append("<label  class='item item-input'><i class='icon ion-search placeholder-icon'></i><input id='nombre' name='nombre' type='search' autofocus placeholder='Search'></label>");
					$("#contacts").append("<div  align='center'  class='buttons'><button  onclick='buscar_log_nombre_id()' class='button'>Buscar</button></div>");
					$("#contacts").append("<ion-spinner icon='ripple'>Buscando</ion-spinner>");
					$("ion-footer-bar").append("<div id='rec' class='buttons' onclick='recargar();'><button class='button icon-left ion-navicon-round'>Eventos</button></div><div id='inv' class='buttons' onclick='invitados();'><button class='button icon-left ion-person-add'>Invitados Nuevos</button></div>");
					
					var con=1;
					for(var i in data){
						if(data['id'+con]!=undefined && data['id'+con]!="" && data['id'+con]!="null"){

							id_contacts = data['id'+con];
							$("#evento").val(data['company'+con]);
							id_conpany = data['company'+con];
							if(data['name'+con]!="null" && data['lname'+con]!="null"){
								
								var var_onclick =' onclick="asistio(1,'+"'"+id_conpany+"'"+','+"'"+id_contacts+"'"+');" ';

								name = data['name'+con]+' '+data['lname'+con];
								$( "#contacts" ).append( "<div id='data"+con+"'  class='list card'> </div>" );
								$( "#data"+con ).append( '<div id="div'+con+'" align="center" onclick="" class="item item-divider">'+name+'</div>' );
								$( "#div"+con ).append( "<label id='label"+con+"'   class='toggle toggle-assertive'></div>" );
								$( "#label"+con ).append( "<input id='ch"+con+"' "+ var_onclick +"  type='checkbox'>" );
								$( "#label"+con ).append( "<div  id='tra"+con+"' align='right' class='track'>" );
								$( "#tra"+con ).append( "<div id='han"+con+"'  class='handle'>" );

							}
							
						}

						con=con+1;
					} 


					
					$("ion-spinner").remove();
					return 1;

				}else{

					
					$("ion-spinner").remove();
					alert('NO EXISTEN CONTACTOS!');
					return 0;
				}
		}
		});


}

function listar_eventos()
{					
	var doc = document.form1;

	$.ajax({
		url:ip+'eventos.php',
		type:'POST',
		global:false,
		data:{},
		dataType:'json',
		error:function(jqXHR,text_status,strError){
		alert('No hay Coneccion');
		console.log(jqXHR.status, strError);},
		timeout:60000,
		success:function(data){
			
				

				var eventos = data['0'];
				var id_evt;
				var name;
				$("#evento").val("0");

				if(data['0']>0)
				{
					
					if ($('#contacts').length){
						$("#contacts").remove();
					}
					if ($('#sal').length){
						$("#sal").remove();
					}
					if ($('#inv').length){
						$("#inv").remove();
					}
					if ($('#rec').length){
						$("#rec").remove();
					}
					if ($('#usu').length){
						$("#usu").remove();
					}
					if ($('#aname').length){
						$("#aname").remove();
					}
					if ($('#eventos').length){
						$("#eventos").remove();
					}
					if ($('#c_usu').length){
						$("#c_usu").remove();
					}

					$("#eventos").remove();
					$("#contenedor").append( "<div id='eventos'  class=''> </div>" );
					$("ion-footer-bar").append("<div id='rec' class='buttons' onclick='recargar();'><button class='button icon-left ion-navicon-round'>Eventos</button></div><div id='sal' class='buttons' ng-click=''><button onclick='salir_inicio()' class='button icon-left ion-power'>Salir</button></div>");
					$("ion-footer-bar").append("<div id='usu' class='buttons' onclick='usuarios_add();'><button class='button icon-left ion-person-stalker'>Crear Usuario</button></div></div>");
					
					

					var con=1;
					for(var i in data){
						if(data['id'+con]!=undefined){
							id_evt = data['id'+con];
							name = data['name'+con];
							$( "#eventos" ).append( "<div id='data"+con+"'  class='list card'> </div>" );
							$( "#data"+con ).append( '<div id="div'+con+'"  onclick="buscar_log('+"'"+id_evt+"'"+');" class="item item-divider">'+name+'</div>' );
							
						}
						con=con+1;
					} 


					

					
					return 1;

				}else{

					
					 alert('NO EXISTEN EVENTOS!');
					return 0;
				}
			

			
		}
		});
}