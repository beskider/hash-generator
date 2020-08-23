const elTextInput = document.querySelector('#text-input');
const elFileInput = document.querySelector('#file-input');
const elSwitchAlgorithm = document.querySelector('.switch-toggle');
const elResult = document.querySelector('#result-text');
const elResultFrame = document.querySelector('#result');
const elTime = document.querySelector('#time');
const elCopyButton = document.querySelector('#copy-button');

elTextInput.addEventListener('input', (event) => {
    let wartosc = elTextInput.value;
    elResult.textContent = hash(wartosc);
      
    
    console.log(elCopyButton.style.visibility); //////////////////////////////////
    elCopyButton.style.visibility = 'visible';  //////////////////////////////////
    
    
    
}, false );
        
elFileInput.addEventListener('change', (event) => {
        elResult.textContent = 'Calculating...';
        let file = event.target.files[0];
        if (!file) {
            return;
        }
        let reader = new FileReader(); 
        reader.onload = function(event) {
            let contents = event.target.result;
            elResult.textContent = hash(contents);
        };
    reader.readAsText(file);
}, false);

elSwitchAlgorithm.addEventListener('change', (event) => {
    elTextInput.value = '';
    elFileInput.value = '';
    elCopyButton.style.visibility = 'hidden';             ///////display: block//////////////////
    
    let algorithm = document.querySelector('input[name=algorithm]:checked').id;
    
    switch (algorithm) {
        case 'md5':
            elResult.style.fontSize = '1.6rem';
            elResultFrame.style.height = '1.6rem';
            break;
        case 'sha1':
            elResult.style.fontSize = '1.4rem';
            elResultFrame.style.height = '1.4rem';
            break;
        case 'sha2':
            elResult.style.fontSize = '0.45rem';
            elResultFrame.style.height = '0.6rem';
            break;
        case 'sha3':
            elResult.style.fontSize = '0.45rem';
            elResultFrame.style.height = '0.6rem';
            break;
    }      
    
    elResult.textContent = hash('');    
    
}, false ); 

elCopyButton.addEventListener('click', () => {
    
  //elResult.select();
  //elResult.setSelectionRangesetSelectionRange(0, 99999)
  
  document.execCommand("copy");
  alert("Copied the text: ");
    
}, false);


  
    
function hash(content) {
    
    if (content === '') {
        elTime.textContent = '';
        return '';
    }

    let algorithm = document.querySelector('input[name="algorithm"]:checked').id;
    let hash;
    
    let timeStart = performance.now();      // start time measurement 
            
    switch (algorithm) {
        case 'md5':
            hash =  CryptoJS.MD5(content);
            break;
        case 'sha1':
            hash =  CryptoJS.SHA1(content);
            break;
        case 'sha2':
            hash =  CryptoJS.SHA512(content);
            break;
        case 'sha3':
            hash =  CryptoJS.SHA3(content);
            break;
    }
            
    let timeStop = performance.now();       // stop time measurement
            
    let time = Math.round(timeStop - timeStart);
    time = time < 1 ? '<1ms' : time + 'ms';
    elTime.textContent = 'Calculating time: ' + time;
            
    return hash;
    
}