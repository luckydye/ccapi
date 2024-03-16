# ccapi

JS interface to use the Canon Camera API

Including openapi definitions


# definitions


Get contents

http://[IPAddress]:[Port]/ccapi/[Version]/contents/[storage]/[directory]/[file][?kind]


URI Parameters
Name Status Data Type Description
storage required string Storage name
directory required string Directory name
file required string File name
kind optional string Contents kind
Value of kind
Name Description

main Main data (Default when kind is not designated)
thumbnail Thumbnail image
display Display image
embedded Embedded image
* RAW only
info File information