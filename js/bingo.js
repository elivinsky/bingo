var Bingo = function()
{
	this.minNum = 1;
	this.maxNum = 90;
	this.velocity = 15;
	
	this.yaSorteados = [];
	this.working = false;
	this.confirmrestart = false;
	
	this.init = function()
	{
		window.resizeTo(800, 600);
	
		//this.velocity = 0;
		this.yaSorteados = [];
		this.confirmrestart = false;
		
		$('#ultima_3').text('-');
		$('#ultima_2').text('-');
		$('#ultima_1').text('-');
		$('#display').text('');
		$('#display').attr('class', '');
		$('#panel').html('');
		
		this.llenarPanel();
		this.clearAlert();
		//this.initMarquee();
	};
	
	this.initMarquee = function()
	{
		$.ajax(
		{
			url: 'marquee.txt',
			dataType: 'text',
			success: function(txt)
			{
				$('#marquee').html($('<div>').text(txt));
				if(txt != '')
				{
					$('#marquee div').marquee();
				}
			}
		});
	};

	this.getNumber = function()
	{
		var rnd = Math.floor(Math.random() * this.maxNum) + this.minNum;
		
		return rnd < 10 ? '0'+rnd : rnd.toString();
	};
	
	this.displayNumber = function(num)
	{
		$('#display').text(num);
	};
	
	this.marcarSorteado = function(num)
	{
		$('#num_'+num).addClass('sorteado');
	};
	
	this.start = function()
	{
		this.working = true;
	
		$('#display').attr('class', '');
		$('#display').addClass('sorting');
		
		$('#ultima_3').text($('#ultima_2').text());
		$('#ultima_2').text($('#ultima_1').text());
		if($('#display').text()) $('#ultima_1').text($('#display').text());
	};
	
	this.finish = function(numero)
	{
		this.working = false;
	
		$('#display').attr('class', '');
		$('#display').addClass('ended');
		
		this.yaSorteados.push(numero);
		this.marcarSorteado(numero);
	};

	this.sortear = function()
	{
		if(this.working)
		{
			console.warn('Ya está sorteando.');
			return;
		}
		
		if(this.yaSorteados.length == (this.maxNum - this.minNum + 1))
		{
			console.warn('Ya se sorteó todo.');
			return;
		}
	
		//this.displayNumber(this.getNumber());return;
	
		var that = this;
	
		var numeros = [0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1], ultimo = null;
		do
		{
			numeros = numeros.map(function(){ return that.getNumber() });
			ultimo = numeros[numeros.length - 1];
			
		}
		while($.inArray(ultimo, this.yaSorteados) != -1);
		
		numeros.push(ultimo);
		
		var i = 0, speed = this.velocity;
		var laFunction = function()
		{
			that.displayNumber(numeros[i]);
			
			i++;
			speed = speed * 1.15;
			
			if(i < numeros.length)
			{
				setTimeout(laFunction, speed);
			}
			else
			{
				that.finish(ultimo);
			}
		};
		
		this.start();
		laFunction();
	};
	
	this.llenarPanel = function()
	{
		for(var i = this.minNum; i <= this.maxNum; i++)
		{
			var num = i < 10 ? '0'+i : i.toString();
			$('#panel').append($('<li>').text(num).attr('id', 'num_'+num));
		}
	};
	
	this.restart = function()
	{
		this.init();
	};
	
	this.alertLinea = function()
	{
		if($('#alert-linea').is(':visible'))
		{
			this.clearAlert();
		}
		else
		{
			this.clearAlert();
			$('#alert-linea').fadeIn('slow');
		}
	};
	
	this.alertBingo = function()
	{
		if($('#alert-bingo').is(':visible'))
		{
			this.clearAlert();
		}
		else
		{
			this.clearAlert();
			$('#alert-bingo').fadeIn('slow');
		}
	};
	
	this.clearAlert = function()
	{
		$('.alert').fadeOut();
	};
	
	this.init();
};