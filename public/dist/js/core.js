

 const appUrl = 'http://localhost:5001';




 $(document).ready(function(){
    $("#customer-create-button").click(function(){
        const formData = $("#customer-create-form").serialize();
        $.ajax({
            url:appUrl + '/app/customers/newCustomer',
            type:'POST',
            dataType:'json',
            data: formData,
            success:function(result){
                if(result.error){
                    Swal.fire({
                        title: 'Hata!',
                        text: result.error,
                        icon: 'error',
                        confirmButtonText: 'Kapat'
                      })
                    return false;
                }else{
                    Swal.fire({
                        title: 'Başaırılı!',
                        text: result.error,
                        icon: 'success',
                        confirmButtonText: 'Kapat'
                      }).then(res => {
                        location.href = appUrl + '/app/customers'
                      })
                }
            }
        });
    
    })
    $('.customers-filtering').select2();
    $('.products-filtering').select2();

    $("#customer-edit-button").click(function(){
        var id = $(this).data('id');
        const formData = $("#customer-edit-form").serialize();
        $.ajax({
            url:appUrl + '/app/customers/editCustomer/'+id,
            type:'POST',
            dataType:'json',
            data: formData,
            success:function(result){
                if(result.error){
                    Swal.fire({
                        title: 'Hata!',
                        text: result.error,
                        icon: 'error',
                        confirmButtonText: 'Kapat'
                      })
                    return false;
                }else{
                    Swal.fire({
                        title: 'Başaırılı!',
                        text: result.error,
                        icon: 'success',
                        confirmButtonText: 'Kapat'
                      }).then(res => {
                        location.href = appUrl + '/app/customers'
                      })
                }
            }
        });
    
    })
	$(document).on('click', '.delete_customer', function(){
		var id = $(this).data('id');

		swal.fire({
		  	title: 'Silmek istediğinden emin misin?',
		  	text: "Bu işlemi geri alamazsın!",
		  	icon: 'warning',
		  	showCancelButton: true,
		  	confirmButtonColor: '#3085d6',
		  	cancelButtonColor: '#d33',
		  	confirmButtonText: 'Sil',
		}).then((result) => {
		  	if (result.value){
		  		$.ajax({
                    type: 'DELETE',
			   		url:appUrl + '/app/customers/'+id,
                    data: {id:id},
                    success:function(data){
                        Swal.fire({
                            title: 'Silme başarılı',
                            icon: 'success',
                            text: 'Silindi!',
                            showConfirmButton: false,
                            timer: 2000,
                        }).then(()=>{
                            window.location.reload();
                        })
                    }
			    })
			    
		  	}
 
		})
	});
    $("#product-create-button").click(function(){
        const formData = $("#product-create-form").serialize();
        $.ajax({
            url:appUrl + '/app/products/newProducts',
            type:'POST',
            dataType:'json',
            data: formData,
            success:function(result){
                if(result.error){
                    Swal.fire({
                        title: 'Hata!',
                        text: result.error,
                        icon: 'error',
                        confirmButtonText: 'Kapat'
                      })
                    return false;
                }else{
                    Swal.fire({
                        title: 'Başaırılı!',
                        text: result.error,
                        icon: 'success',
                        confirmButtonText: 'Kapat'
                      }).then(res => {
                        location.href = appUrl + '/app/products'
                      })
                }
            }
        });
    
    })

    $("#product-edit-button").click(function(){
        var id = $(this).data('id');
        const formData = $("#product-edit-form").serialize();
        $.ajax({
            url:appUrl + '/app/products/editProducts/'+id,
            type:'POST',
            dataType:'json',
            data: formData,
            success:function(result){
                if(result.error){
                    Swal.fire({
                        title: 'Hata!',
                        text: result.error,
                        icon: 'error',
                        confirmButtonText: 'Kapat'
                      })
                    return false;
                }else{
                    Swal.fire({
                        title: 'Başaırılı!',
                        text: result.error,
                        icon: 'success',
                        confirmButtonText: 'Kapat'
                      }).then(res => {
                        location.href = appUrl + '/app/products'
                      })
                }
            }
        });
    
    })
    $(document).on('click', '.delete_product', function(){
		var id = $(this).data('id');
        console.log(id)
		swal.fire({
		  	title: 'Silmek istediğinden emin misin?',
		  	text: "Bu işlemi geri alamazsın!",
		  	icon: 'warning',
		  	showCancelButton: true,
		  	confirmButtonColor: '#3085d6',
		  	cancelButtonColor: '#d33',
		  	confirmButtonText: 'Sil',
		}).then((result) => {
		  	if (result.value){
		  		$.ajax({
                    type: 'DELETE',
			   		url:appUrl + '/app/products/'+id,
                    data: {id:id},
                    success:function(data){
                        Swal.fire({
                            title: 'Silme başarılı',
                            icon: 'success',
                            text: 'Silindi!',
                            showConfirmButton: false,
                            timer: 2000,
                        }).then(()=>{
                            window.location.reload();
                        })
                    }
			    })
			    
		  	}
 
		})
	});
    $(document).on('click', '.delete_user', function(){
		var id = $(this).data('id');
        console.log(id)
		swal.fire({
		  	title: 'Silmek istediğinden emin misin?',
		  	text: "Bu işlemi geri alamazsın!",
		  	icon: 'warning',
		  	showCancelButton: true,
		  	confirmButtonColor: '#3085d6',
		  	cancelButtonColor: '#d33',
		  	confirmButtonText: 'Sil',
		}).then((result) => {
		  	if (result.value){
		  		$.ajax({
                    type: 'DELETE',
			   		url:appUrl + '/app/users/'+id,
                    data: {id:id},
                    success:function(data){
                        Swal.fire({
                            title: 'Silme başarılı',
                            icon: 'success',
                            text: 'Silindi!',
                            showConfirmButton: false,
                            timer: 2000,
                        }).then(()=>{
                            window.location.reload();
                        })
                    }
			    })
			    
		  	}
 
		})
	});
    $("#user-create-button").click(function(){
        const formData = $("#user-create-form").serialize();
        $.ajax({
            url:appUrl + '/app/users/newUser',
            type:'POST',
            dataType:'json',
            data: formData,
            success:function(result){
                if(result.error){
                    Swal.fire({
                        title: 'Hata!',
                        text: result.error,
                        icon: 'error',
                        confirmButtonText: 'Kapat'
                      })
                    return false;
                }else{
                    Swal.fire({
                        title: 'Başaırılı!',
                        text: result.error,
                        icon: 'success',
                        confirmButtonText: 'Kapat'
                      }).then(res => {
                        location.href = appUrl + '/app/users'
                      })
                }
            }
        });
    
    })
    $("#user-edit-button").click(function(){
        var id = $(this).data('id');
        const formData = $("#user-edit-form").serialize();
        $.ajax({
            url:appUrl + '/app/users/editUser/'+id,
            type:'POST',
            dataType:'json',
            data: formData,
            success:function(result){
                if(result.error){
                    Swal.fire({
                        title: 'Hata!',
                        text: result.error,
                        icon: 'error',
                        confirmButtonText: 'Kapat'
                      })
                    return false;
                }else{
                    Swal.fire({
                        title: 'Başaırılı!',
                        text: result.error,
                        icon: 'success',
                        confirmButtonText: 'Kapat'
                      }).then(res => {
                        location.href = appUrl + '/app/users'
                      })
                }
            }
        });
    
    })
    $("#offer-create-button").click(function(){
        const formData = $("#offer-create-form").serialize();
        $.ajax({
            url:appUrl + '/app/offer/newOffer',
            type:'POST',
            dataType:'json',
            data: formData,
            success:function(result){
                if(result.error){
                    Swal.fire({
                        title: 'Hata!',
                        text: result.error,
                        icon: 'error',
                        confirmButtonText: 'Kapat'
                      })
                    return false;
                }else{
                    Swal.fire({
                        title: 'Başaırılı!',
                        text: result.error,
                        icon: 'success',
                        confirmButtonText: 'Kapat'
                      }).then(res => {
                        location.href = appUrl + '/app/offer'
                      })
                }
            }
        });
    
    })
    $("#offer-edit-button").click(function(){
        var id = $(this).data('id');
        const formData = $("#offer-edit-form").serialize();
        $.ajax({
            url:appUrl + '/app/offer/editOffer/'+id,
            type:'POST',
            dataType:'json',
            data: formData,
            success:function(result){
                if(result.error){
                    Swal.fire({
                        title: 'Hata!',
                        text: result.error,
                        icon: 'error',
                        confirmButtonText: 'Kapat'
                      })
                    return false;
                }else{
                    Swal.fire({
                        title: 'Başaırılı!',
                        text: result.error,
                        icon: 'success',
                        confirmButtonText: 'Kapat'
                      }).then(res => {
                        location.href = appUrl + '/app/offer'
                      })
                }
            }
        });
    
    })
    $(document).on('click', '.delete_offer', function(){
		var id = $(this).data('id');
        console.log(id)
		swal.fire({
		  	title: 'Silmek istediğinden emin misin?',
		  	text: "Bu işlemi geri alamazsın!",
		  	icon: 'warning',
		  	showCancelButton: true,
		  	confirmButtonColor: '#3085d6',
		  	cancelButtonColor: '#d33',
		  	confirmButtonText: 'Sil',
		}).then((result) => {
		  	if (result.value){
		  		$.ajax({
                    type: 'DELETE',
			   		url:appUrl + '/app/offer/'+id,
                    data: {id:id},
                    success:function(data){
                        Swal.fire({
                            title: 'Silme başarılı',
                            icon: 'success',
                            text: 'Silindi!',
                            showConfirmButton: false,
                            timer: 2000,
                        }).then(()=>{
                            window.location.reload();
                        })
                    }
			    })
			    
		  	}
 
		})
	});
    $("#payment-create-button").click(function(){
        const formData = $("#payment-create-form").serialize();
        const id = JSON.parse(paymentId)
        $.ajax({
            url:appUrl + '/app/bill/addPayment/'+id,
            type:'PATCH',
            dataType:'json',
            data: formData,
            success:function(result){
                if(result.error){
                    Swal.fire({
                        title: 'Hata!',
                        text: result.error,
                        icon: 'error',
                        confirmButtonText: 'Kapat'
                      })
                    return false;
                }else{
                    Swal.fire({
                        title: 'Başaırılı!',
                        text: result.error,
                        icon: 'success',
                        confirmButtonText: 'Kapat'
                      }).then(res => {
                        location.href = appUrl + '/app/bill'
                      })
                }
            }
        });
    
    })
    $(document).on('click', '#createBill', function(){
		var id = $(this).data('id');
        console.log(id)
		swal.fire({
		  	title: 'Fatura oluşturmak istediğinden emin misin?',
		  	icon: 'warning',
            text: "Fatura oluşturduğunuzda toplam tutar, güncel kur üzerinden hesaplanacaktır!",
		  	showCancelButton: true,
		  	confirmButtonColor: '#3085d6',
		  	cancelButtonColor: '#d33',
		  	confirmButtonText: 'Oluştur',
		}).then((result) => {
		  	if (result.value){
		  		$.ajax({
                    type: 'PATCH',
			   		url:appUrl + '/app/offer/'+id,
                    dataType:'json',
                    data: { 
                        createBill: true,
                        billDate: new Date()
                    },
                    success:function(data){
                        Swal.fire({
                            title: 'Fatura oluşturuldu',
                            icon: 'success',
                            text: 'Başarılı!',
                            showConfirmButton: false,
                            timer: 2000,
                        }).then(()=>{
                            window.location = appUrl + '/app/bill/billDetail/'+id 
                        })
                    }
			    })
			    
		  	}
 
		})
	});
    $('.currencyInput').maskMoney({thousands:'', decimal:'.', allowZero:true,precision:2});
    $('.currencyInput2').maskMoney({thousands:'', decimal:'.', allowZero:true,precision:2});

    (function ($) { $.fn.datepicker.dates['tr'] = {
        days: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
        daysShort: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
        daysMin: ['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'],
        months: ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran', 'Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'],
        monthsShort: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
        today: 'Bugün',
        clear: 'Temizle',
        dateFormat: 'dd.mm.yyyy',
        firstDay: 1
    };
    })(jQuery);
  

    jQuery(function($) {
        $('#datepicker').datepicker({
            isRTL: true,
            format: 'dd.mm.yyyy',
            autoclose:true,
            todayHighlight: true,
            language: 'tr',
            
        }).datepicker('update', new Date());
    });

     var rowIdx = 1;
     // jQuery button click event to add a row
     $('#btnAdd').on('click', function () {
        const productOptionList = JSON.parse(productList__).map(item  => {
            return `<option value="${item._id}">${item.productName}</option>`
        }).join('');
       // Adding a row inside the tbody.
       $('#dynamicTable').append(`<tr id="R${++rowIdx}">
       <td>
           <div class="input-group">
               <select class="form-control select2 products-filtering" name="productId[]">
                   ${productOptionList}
                  </select>
           </div>
                   
       </td>
       <td><input class="form-control  ms-n5 piece" type="number" min="1" step="any" name="piece[]"/> </td>
       <td>
           <select size="1" class="form-control form-select"  name="unit[]">
               <option value="adet">
                   Adet
               </option>
               <option value="metre">
                   Metre
               </option>
           </select>
       </td>
       <td><input class="form-control currencyInput unitPrice" type="text"  name="unitPrice[]"> </td>
       <td>
           <div class="input-group ">
               <span class="input-group-text">%</span>
               <input type="text" class="form-control taxPercent" name="taxPercent[]" >
           </div>
       </td>
    
       <td>
           <div class="input-group ">
               <input type="text" class="form-control is-valid total" name="totalAccount[]" disabled >
           </div>
       </td>
   </tr>`);
   $('.currencyInput').maskMoney({thousands:'', decimal:'.', allowZero:true,precision:2});
     });

     function calculateTotal(index){
        const piece = parseFloat($('.piece').eq(index).val());
        const unitPrice = parseFloat($('.unitPrice').eq(index).val());
        const taxPercent = parseFloat($('.taxPercent').eq(index).val());
       
        if(piece && unitPrice && taxPercent && !NaN){
            const total = ((piece * unitPrice ) + (piece * unitPrice* (taxPercent / 100))) ;
            $("input[name='totalAccount[]']").eq(index).val(total.toFixed(2));
            
            let domTotal = 0;
            let domSubTotal= 0 ;
            $("input[name='totalAccount[]']").each(function(item){
                domTotal += parseFloat(this.value);       
                $("#generalTotal").text(domTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
            })
            $("input[name='unitPrice[]']").each(function(item){
                domSubTotal += parseFloat(this.value);   
                $("#subTotal").text(domSubTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
            })
            
            let generalTotal = parseFloat($("#generalTotal").text().replace(/[^0-9\.]+/g,"")) 
            let subTotal=  parseFloat($("#subTotal").text().replace(/[^0-9\.]+/g,""))
            let kdv =  generalTotal - subTotal
             $("#totalKDV").text(kdv.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))
             
        }
        
     }
      
      $(document).on('keyup','.piece',function(){
        const index =  $(this).closest('tr').index();
        calculateTotal(index);
      })

      $(document).on('keyup','.unitPrice',function(){
        const index =  $(this).closest('tr').index();
        calculateTotal(index);
      })
      $(document).on('keyup','.taxPercent',function(){
        const index =  $(this).closest('tr').index();
        calculateTotal(index); 
      })



      function payment(){
        const pay = parseFloat($('.pay').val());
        if(pay){
            $("#payment").text(pay.toFixed(2));

            let totalUnpaid = parseFloat($("#totalUnpaid").text().replace(/[^0-9\.]+/g,"")) 
            let pay_ = parseFloat($("#payment").text()) 
            let unPaid= (totalUnpaid - pay_)
            $("#remaining").text(unPaid.toFixed(4).replace(/\d(?=(\d{3})+\.)/g, '$&,')) 
             
        }
      }

      $(document).on('keyup','.pay',function(){
            payment()
      })


 });

