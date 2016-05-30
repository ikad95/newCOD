<?php

/* 
	
	Order Status : 0 is order received but not executed yet
				   1 is order currently in progress
				   2 is order completed
				   3 is driver dispatched
				   -1 is order cancelled

	Step 1: Update the data in Order table

	Step 2: Send SMS to driver of Customer details

*/
require_once '../variables.php';

logincheck(); //check if the authenticated user is sending the data

$user_id=$_REQUEST["user_id"];

$con=mysqli_connect($server,$username,$password,$database) or die ("could not connect to mysql");
$query="select * from `user` where `user_id`='".$user_id."' limit 1";
$result=mysqli_query($con,$query);

$row=mysqli_fetch_array($result);

$output='[{"user_id":"'.$row["user_id"].'","name":"'.$row["name"].'","mobile":"'.$row["mobile"].'","email":"'.$row["email"].'"}]';

echo $output;

mysqli_close($con);
?>