let button = document.getElementsByClassName('btn')[0];
let table1 = document.getElementsByClassName('table1')[0];
let table2 = document.getElementsByClassName('table2')[0];
let table3 = document.getElementsByClassName('table3')[0];

const saveOrderDetails = () => {
     let price = document.getElementsByClassName('price')[0].value;
     let dish = document.getElementsByClassName('dish')[0].value;
     let table = document.getElementsByClassName('table')[0].value;

     // display order details
     let infoDetails = document.createElement('li');
     infoDetails.textContent = `${price}-${dish}-${table}`;

     // delete button
     let deleteBtn = document.createElement("button");
     deleteBtn.textContent = "Delete";

     // delete button functionality
     deleteBtn.addEventListener('click', () => {
          infoDetails.remove();
          deleteBtn.remove();

          // DELETE request 
          axios
               .delete(`https://crudcrud.com/api/0bad464337c24f649c3537821318e043/orderDetails/${order._id}`)
               .then((response) => {
                    console.log(response);
               })
               .catch((error) => {
                    console.log(error);
               });
     });

     if (table === 'Table 1') {
          table1.appendChild(infoDetails);
          table1.appendChild(deleteBtn);
     } else if (table === 'Table 2') {
          table2.appendChild(infoDetails);
          table2.appendChild(deleteBtn);
     } else if (table === 'Table 3') {
          table3.appendChild(infoDetails);
          table3.appendChild(deleteBtn);
     }


     document.getElementsByClassName('price')[0].value = '';
     document.getElementsByClassName('dish')[0].value = '';
     document.getElementsByClassName('table')[0].value = '';

     // POST request 
     axios
          .post('https://crudcrud.com/api/0bad464337c24f649c3537821318e043/orderDetails', {
               price: price,
               dish: dish,
               table: table
          })
          .then((response) => {
               console.log(response);
          })
          .catch((error) => {
               console.log(error);
          });
};

// retrieve order details from the server
const retrieveOrderDetails = () => {
     axios
          .get('https://crudcrud.com/api/0bad464337c24f649c3537821318e043/orderDetails')
          .then((response) => {
               console.log(response);
               for (let i = 0; i < response.data.length; i++) {
                    const { price, dish, table, _id } = response.data[i];
                    let infoDetails = document.createElement('li');
                    infoDetails.textContent = `${price}-${dish}-${table}`;

                    let deleteBtn = document.createElement('button');
                    deleteBtn.textContent = 'Delete';

                    deleteBtn.addEventListener('click', () => {
                         infoDetails.remove();
                         deleteBtn.remove();

                         // DELETE request 
                         axios
                              .delete(`https://crudcrud.com/api/0bad464337c24f649c3537821318e043/orderDetails/${_id}`)
                              .then((response) => {
                                   console.log(response);
                              })
                              .catch((error) => {
                                   console.log(error);
                              });
                    });

                    if (table === 'Table 1') {
                         table1.appendChild(infoDetails);
                         table1.appendChild(deleteBtn);
                    } else if (table === 'Table 2') {
                         table2.appendChild(infoDetails);
                         table2.appendChild(deleteBtn);
                    } else if (table === 'Table 3') {
                         table3.appendChild(infoDetails);
                         table3.appendChild(deleteBtn);
                    }
               }
          })
          .catch((error) => {
               console.log(error);
          });
};

button.addEventListener('click', saveOrderDetails);
window.addEventListener('DOMContentLoaded', retrieveOrderDetails);
