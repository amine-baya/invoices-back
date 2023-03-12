module.exports = ({ clientData, RowsData, sumLabor, sumMterial }) => {
   const today = new Date();
   const day = today.getDate();
   const month = (today.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2});
   const year = today.getFullYear()
   const yearCode = today.getFullYear().toString().slice(2);
return `
   <!doctype html>
   <html>
      <head>
         <meta charset="utf-8">
         <title>PDF Result Template</title>
         <style>
            .invoice-box {
            max-width: 800px;
            margin: auto;
            padding: 30px;
            box-shadow: 0 0 10px rgba(0, 0, 0, .15);
            font-size: 16px;
            line-height: 24px;
            font-family: 'Helvetica Neue', 'Helvetica',
            color: #555;
            }
            .header{
              display: flex;
              justify-content: space-between;
              align-items: center;
          }
      
          .header-title{
              font-size: xx-large;
              font-weight: bold;
              color: black;
          }
         </style>
      </head>
      <body>
         <div class="invoice-box">
         <table style="border-collapse: collapse;">
         <tr>
           <td style="text-align: left; width: 50%;">
             <h1 style="font-size: 24px;" >Invoice: ${month}${day}${yearCode}</h1>
           </td>
           <td style="text-align: right; width: 50%;">
             <img src="https://i2.wp.com/cleverlogos.co/wp-content/uploads/2018/05/reciepthound_1.jpg?fit=800%2C600&ssl=1" alt="Logo" width="100" height="100">
           </td>
         </tr>
         <tr>
            <td></td>
            <td style="text-align: right;">
               <p style="font-size: 10px; font-height: bold; display: block; margin: 0; padding: 0; ">License#: 1067819</p>
               <p style="font-size: 10px; font-height: bold; display: block; margin: 0; padding: 0; ">Address: 4446 w Manhattan Beach,Lawndale CA 90260</p>
               <p style="font-size: 10px; font-height: bold; display: block; margin: 0; padding: 0; ">Phone (Direct): (323)916-1646</p>
               <p style="font-size: 10px; font-height: bold; display: block; margin: 0; padding: 0; ">Email: biaconstructionco@gmail.com</p>
               <p style="font-size: 10px; font-height: bold; display: block; margin: 0; padding: 0; ">Date of Contract: ${month}/${day}/${year}</p>

            </td>
         </tr>
         <tr style="border: 1px solid black; margin: 0; padding: 0; ">
         <td style="width: 50%; border-right: 1px solid black;">
           <span style="font-size: 10px; font-weight: bold; padding-left: 5px; padding-bottom: 0; margin-bottom: 0;">Proposal Submitted To:</span>
           <ul style="list-style-type: none; padding: 0; margin: 0;">
            <li style="font-size: 10px; font-height: bold; margin: 0; padding-left: 5px;">Name: ${clientData.name}</li>
            <li style="font-size: 10px; font-height: bold; margin: 0; padding-left: 5px;">Address: ${clientData.address}</li>
            <li style="font-size: 10px; font-height: bold; margin: 0;  padding-left: 5px;">Email: ${clientData.email}</li>
            <li style="font-size: 10px; font-height: bold; margin: 0; padding-left: 5px;">Phone Number: ${clientData.phone}</li>
           </ul>
         </td>
         <td style="width: 50%; margin: 0; padding: 0; height: 100%;">
         <span style="font-size: 10px; font-weight: bold; padding-left: 5px; padding-bottom: 0; margin-bottom: 0;">Work To Be Performed At (delivery address):</span>
         <ul style="list-style-type: none; padding: 0; margin: 0;">
          <li opacity: 0; style="font-size: 10px; font-height: bold; margin: 0; padding-left: 5px;"> </li>
          <li opacity: 1; style="font-size: 10px; font-height: bold; margin: 0; padding-left: 5px;"> ${clientData.delivery_address}</li>
          <li opacity: 0; style="font-size: 10px; font-height: bold; margin: 0  padding-left: 5px;"> </li>
          <li opacity: 0; style="font-size: 10px; font-height: bold; margin: 0; padding-left: 5px;"> </li>
          <li opacity: 0; style="font-size: 10px; font-height: bold; margin: 0; padding-left: 5px;"> </li>
         </ul>
         </td>
       </tr>
       <tr style="height: 30px">
       </tr>
       <tr>
       <table style="border-collapse: collapse; width: 90%; margin: auto; "    >
       <tr style="border: 1px solid black; margin: 0; padding: 0; ">
         <th style="width: 40%; border: 1px solid black; margin-right: 0; font-size: 12px;" >Description</th>
         <th style="width: 20%; border: 1px solid black; text-align: center; font-size: 12px;" >Labor</th>
         <th style="width: 20%; border: 1px solid black; text-align: center; font-size: 12px; " >Material/Equipment</th>
         <th style="width: 20%; border: 1px solid black; text-align: center; font-size: 12px; " >Total</th>
       </tr>
       ${RowsData.map(item => `<tr  style="border: 1px solid black;" >
       ${item.map((it,i) => `<td  style="border: 1px solid black; font-size: 12px; text-align: center;" >${i === 0 ? '' : '$'} ${it}</td>`).join('')}
       
       </tr>`).join('')}
       <tr style="border: 1px solid black; margin: 0; padding: 0; ">
         <td style="width: 40%; border: 1px solid black; margin-right: 0; font-size: 12px; font-size: 900; text-align: center;" >Balance due:</td>
         <td style="width: 20%; border: 1px solid black; text-align: center; font-size: 12px;" >$ ${sumLabor}</td>
         <td style="width: 20%; border: 1px solid black; text-align: center; font-size: 12px; " >$ ${sumMterial}</td>
         <td style="width: 20%; border: 1px solid black; text-align: center; font-size: 12px; " >$ ${sumLabor + sumMterial}</td>
       </tr>
     </table>
     
       </tr>
       </table>

         </div>
      </body>
   </html>
   `;
};