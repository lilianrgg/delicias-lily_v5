$(function () {
	$('[data-toggle="popover"]').popover()
	$('.carousel').carousel({
	  interval: 2000
});



$('#exampleModal').on('show.bs.modal', function(e){
		console.log('El modal se está mostrando');

		$('#btnRese').removeClass('btnJumbotron btn-info btn-lg');
		$('#btnRese').addClass('btn btn-secundary');
		$('#btnRese').prop('disabled',true);

});
$('#exampleModal').on('shown.bs.modal', function(e){
		console.log('El modal se mostró');
});	

$('#exampleModal').on('hide.bs.modal', function(e){
		console.log('El modal se está ocultando');

});
$('#exampleModal').on('hidden.bs.modal', function(e){
		console.log('El modal se ocultó');
		$('#btnRese').prop('disabled',false);
		$('#btnRese').removeClass('btn btn-secundary');
		$('#btnRese').addClass('btnJumbotron btn-info btn-lg');
});	
});