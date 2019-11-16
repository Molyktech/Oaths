export class Print {

    static print(id) {
        
            let printContent, WindowPrt;
            printContent = document.getElementById(id).innerHTML;
            WindowPrt = window.open(
              '',
              '_blank',
              'top=0,left=0,height=100%,width=auto'
            );
            WindowPrt.document.open();
        
            WindowPrt.document.write(`
              <html>
                <head>
                  <title>Print tab</title>
                  <style>
                  .head-text h3 {
                    letter-spacing: 1px;
                    padding: 10px;
                    font-weight: bolder;
                    font-family: Georgia, serif;
                    line-height: 1.3em;
                  }
                  
                  .text-block p {
                    font-family: Georgia, serif;
                    letter-spacing: 1px;
                    word-spacing: 2px;
                    padding: 10px;
                  }
                  .modal-body{
                    
                    text-align: center;
                  }
                  button { display:none}
        
                  </style>
                </head>
            <body onload="window.print();window.close()">${printContent}</body>
              </html>`);
              WindowPrt.document.close();
                WindowPrt.focus();
                WindowPrt.print();
                WindowPrt.close();
    }
}
