const test =(()=>{
  console.log('testing');
})

const uploadClient = ((req,res)=>{
  console.log('uploadClient');
  console.log(req.file);
  console.log(req.body);

})

module.exports = {
  uploadClient,
  test,
}