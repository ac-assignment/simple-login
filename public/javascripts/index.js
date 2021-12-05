toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-center",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": 200,
  "hideDuration": 200,
  "timeOut": 3000,
  "extendedTimeOut": 500,
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}
if (hasError) {
  toastr.error('信箱或密碼錯誤')
}

const form = document.querySelector('#login-form')
form.addEventListener('submit', function(e) {
  e.preventDefault()
  e.stopPropagation()
  
  const email = form.querySelector('#email')
  const password = form.querySelector('#password')
  
  if (email.value.length > 0 && password.value.length > 0) {
    e.target.submit()
  } else {
    toastr.error('帳號或密碼未輸入')
  }
})