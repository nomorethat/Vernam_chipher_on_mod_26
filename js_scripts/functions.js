$(document).ready(function(){
	$("#container #to_encrypt").bind("click", to_encrypt);
	
	function to_encrypt(){
		$("#container #result").empty();
		$("#container textarea").css("border", "1px solid #bbb");
		$("#container input[name='key']").css("border", "1px solid #bbb");
		
		var open_message = $("#container textarea").val();
		if(open_message.length < 1){
			$("#container #result").append("<span>Шифрование невозможно (открытый текст отсутствует)</span>");
			$("#container textarea").css("border", "1px solid #f00");
			return;
		}
		
		open_message = normalize_of_data(open_message); // нормализация исходного сообщения
		alphabet = generate_of_latin_alphabet(); // генерируем латинский алфавит
		var pseudorandom_sequence = generate_of_pseudorandom_sequence(open_message.length); // генерируем псевдослучайную последовательность
		var chipher_text = gamming_on_mod_26(open_message, pseudorandom_sequence); // получаем шифротекст наложением гаммы
		
		$("#container #result").append("<br /><span><b>Сообщение: </b>" + open_message + "</span>");
		$("#container #result").append("<br /><span><b>Псевдослучайная последовательность: </b>" + pseudorandom_sequence + "</span><br />");
		$("#container #result").append("<span><b>Шифротекст: </b>" + chipher_text + "</span>");
	}
	
	function normalize_of_data(data){
		data = data.toLowerCase();
		for(var i = 0; i < data.length; i++){
			var code_of_symbol = data.charCodeAt(i);
			if((code_of_symbol < 97)  || (code_of_symbol > 123)){
				data = data.replace(data.charAt(i), "");
				i--;
			}
		}
		return data;
	}
	
	function generate_of_latin_alphabet(){
		var the_beginning_of_the_alphabet_in_the_encoding = 97;
		var alphabet = new Array();
		for(var i = 0; i < 26; i++){
			alphabet[i] = String.fromCharCode(the_beginning_of_the_alphabet_in_the_encoding + i);
		}
		return alphabet;
	}
	
	function generate_of_pseudorandom_sequence(size){
		var pseudorandom_sequence = "";
		for(var i = 0; i < size; i++){
			var pseudorandom_symbol = getRandomInRange(0, 25);
			pseudorandom_sequence += alphabet[pseudorandom_symbol];
		}
		return pseudorandom_sequence;
	}
	
	function getRandomInRange(min, max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	function gamming_on_mod_26(open_message, pseudorandom_sequence){
		var chipher_text = new Array();
		for(var i = 0; i < open_message.length; i++){
			for(var j = 0; j < alphabet.length; j++){
				if(alphabet[j] === open_message.charAt(i))
					var symbol_of_open_message = j;
				if(alphabet[j] === pseudorandom_sequence.charAt(i))
					var symbol_of_pseudorandom_sequence = j;
			}
			chipher_text[i] = alphabet[(symbol_of_open_message + symbol_of_pseudorandom_sequence)%26];
		}
		return chipher_text.join("");
	}
});