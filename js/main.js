$(document).ready(function() {
	$('.sendMessage').click(function(){
		var message = $('.messageText').val();
		if (message.length == 0) {
			alert("Введите сообщение");
		}else{
			$.ajax({
				type:"POST",
				url:"methods/sendMessages.php",
				data:"message="+message+"",
				success:function updateMessage(data){	
					if (data) {	
						data = data.split(" ");
						console.log(data);
						$('.messageText').val("");
						$('.message--correspondence').append('<div class="messages"><div class="img--block"><img src="'+data['3']+'" alt="Картинка" /></div><div class="name--user">'+data['1']+'</div><div class="dateSendMeassage">'+data['4']+'</div><div class="dataMessage">'+message+'</div></div>');
						var div = $(".message--block");
							div.scrollTop(div.prop('scrollHeight'));
							$('.beforeMessage').remove();
					}
				}

			});
		}
	});
	$(".message--block").scrollTop($(".message--block").prop('scrollHeight'));

	$('html').keydown(function(e){ //отлавливаем нажатие клавиш
		  if (e.keyCode == 13) { //если нажали Enter, то true
		  	var message = $('.messageText').val();
		  	if (message.length == 0) {
		  		alert("Введите сообщение");
		  	}else{
		  		$.ajax({
		  			type:"POST",
		  			url:"methods/sendMessages.php",
		  			data:"message="+message+"",
		  			success:function updateMessage(data){	
		  				if (data) {	
		  					data = data.split(" ");
		  					console.log(data);
		  					$('.messageText').val("");
		  					$('.message--correspondence').append('<div class="messages"><div class="img--block"><img src="'+data['3']+'" alt="Картинка" /></div><div class="name--user">'+data['1']+'</div><div class="dateSendMeassage">'+data['4']+'</div><div class="dataMessage">'+message+'</div></div>');
		  					var div = $(".message--block");
							div.scrollTop(div.prop('scrollHeight'));
							$('.beforeMessage').remove();
		  				}
		  			}

		  		});
		  	}
		  }
		});
	if($('.message--correspondence  > .messages').length == 0){
		$('.message--correspondence  ').append('<h2 class="beforeMessage"><div>Пока сообщений нет</h2>');
	}

});

