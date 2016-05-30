<?php 
function newOrder($user_id,$security_token,$address,$city,$state,$pin,$min_hours,$request_date,$request_time){
  if($user_id=="" || $security_token=="" || $address=="" || $city=="" || $state=="" || $pin=="" || $min_hours=="" || $request_date=="" || $request_time==""){
    return 0;
  }
  $data=['user_id'=>$user_id,'security_token'=>$security_token,'address'=>$address,'city'=>$city,'state'=>$state,'pin'=>$pin,'min_hours'=>$min_hours,'request_date'=>$request_date,'request_time'=>$request_time];
  $url = "http://careodrive.com/order/new.php";
  $curl = curl_init();
  curl_setopt($curl, CURLOPT_URL, $url); 
  curl_setopt($curl, CURLOPT_HEADER, 0);
  curl_setopt($curl, CURLOPT_POST, 1);
  curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  $result = curl_exec($curl);
  curl_close($curl);
  //echo "<h>"+$result['status']+"</h>";
  $arr = (json_decode($result,true));
  return $arr[0]['status']=='ok'?1:0;
}
function editUser($user_id,$security_token,$name,$mobile,$email){
  if($user_id=="" || $security_token=="" || $name=="" || $mobile=="" || $email=="" ){
    return 0;
  }
  $data=['user_id'=>$user_id,'security_token'=>$security_token,'name'=>$name,'mobile'=>$mobile,'email'=>$email];
  $url = "http://careodrive.com/user/edit.php";
  $curl = curl_init();
  curl_setopt($curl, CURLOPT_URL, $url); 
  curl_setopt($curl, CURLOPT_HEADER, 0);
  curl_setopt($curl, CURLOPT_POST, 1);
  curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  $result = curl_exec($curl);
  curl_close($curl);
  //echo "<h>"+$result['status']+"</h>";
  $arr = (json_decode($result,true));
  return var_dump($result);
  return $arr[0]['status']=='ok'?1:0;
}

function isLoggedIn($mobile,$password){
  if($mobile==""){
    return 0;
  }
  if($password==""){
    return 0;
  }

  $data=['mobile'=>$mobile,'password'=>$password];
  $url = "http://careodrive.com/checkLogin.php";
  $curl = curl_init();
  curl_setopt($curl, CURLOPT_URL, $url); 
  curl_setopt($curl, CURLOPT_HEADER, 0);
  curl_setopt($curl, CURLOPT_POST, 1);
  curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  $result = curl_exec($curl);
  curl_close($curl);
  echo var_dump($result);
  $arr = (json_decode($result,true));
  return $arr[0]['status']=='ok'?1:0;
  //check if account is verified
  //if not verified, OTP must be entered
}
//change password API
function changePassword($user_id,$old,$new){
  if($user_id==""){
    return 0;
  }
  if($old==""){
    return 0;
  }
  if($new==""){
    return 0;
  }
  $data=['user_id'=>$user_id,'current_password'=>$old,'new_password'=>$new];
  $url = "http://careodrive.com/changePassword.php";
  $curl = curl_init();
  curl_setopt($curl, CURLOPT_URL, $url); 
  curl_setopt($curl, CURLOPT_HEADER, 0);
  curl_setopt($curl, CURLOPT_POST, 1);
  curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  $result = curl_exec($curl);
  curl_close($curl);
  $arr = (json_decode($result,true));
  //return var_dump($result);
  return $arr[0]['status']=='ok'?1:0;
}
function addUser($name,$mobile,$email,$password){
  $data=['name'=>$name,'mobile'=>$mobile,'email'=>$email,'password'=>$password];
  $url = "http://careodrive.com/user/add.php";
  $curl = curl_init();
  curl_setopt($curl, CURLOPT_URL, $url); 
  curl_setopt($curl, CURLOPT_HEADER, 0);
  curl_setopt($curl, CURLOPT_POST, 1);
  curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  $result = curl_exec($curl);
  curl_close($curl);
  $arr = (json_decode($result,true));
  //echo var_dump($result);
  return $arr[0]['status']=='ok'?1:0;
}
function cancelOrder($order_id,$user_id,$security_token){
  if($user_id==""){
    return 0;
  }
  if($order_id==""){
    return 0;
  }
  if($security_token==""){
    return 0;
  }
  $data=['order_id'=>$order_id,'user_id'=>$user_id,'security_token'=>$security_token];
  $url = "http://careodrive.com/order/cancel.php";
  $curl = curl_init();
  curl_setopt($curl, CURLOPT_URL, $url); 
  curl_setopt($curl, CURLOPT_HEADER, 0);
  curl_setopt($curl, CURLOPT_POST, 1);
  curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  $result = curl_exec($curl);
  curl_close($curl);
  $arr = (json_decode($result,true));
  return $arr[0]['status']=='ok'?1:0;
}

function verifyOTPR($mobile,$otp){
  if($mobile==""){
    return 0;
  }
  if($otp==""){
    return 0;
  }
  $data=['mobile'=>$mobile,'otp'=>$otp];
  $url = "http://careodrive.com/user/verify_otp_register.php";
  $curl = curl_init();
  curl_setopt($curl, CURLOPT_URL, $url); 
  curl_setopt($curl, CURLOPT_HEADER, 0);
  curl_setopt($curl, CURLOPT_POST, 1);
  curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  $result = curl_exec($curl);
  curl_close($curl);
  $arr = (json_decode($result,true));
  //if verified call newUserApi()
  return $arr[0]['status']=='ok'?1:0;
}

function verifyOTPFP($mobile,$otp,$new_password){
  if($mobile==""){
    return 0;
  }
  if($otp==""){
    return 0;
  }
  $data=['mobile'=>$mobile,'otp'=>$otp,'new_password'=>$new_password];
  $url = "http://careodrive.com/user/verify_otp_fp.php";
  $curl = curl_init();
  curl_setopt($curl, CURLOPT_URL, $url); 
  curl_setopt($curl, CURLOPT_HEADER, 0);
  curl_setopt($curl, CURLOPT_POST, 1);
  curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  $result = curl_exec($curl);
  curl_close($curl);
  $arr = (json_decode($result,true));
  //if verified call changePassword()
  return $arr[0]['status']=='ok'?1:0;
}

 ?>