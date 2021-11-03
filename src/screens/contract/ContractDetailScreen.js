import React, { Component } from "react";
import {  View,Text,StyleSheet, SafeAreaView,ScrollView,TouchableOpacity,Switch} from 'react-native';
import {formatNumber } from 'react-native-currency-input';
export default class ContractDetailScreen extends React.Component
{
     constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      
      
    };
    
  }
  toggleSwitch=(value)=>{
    this.setState({toggle:value})
  }
  
  onChangeStatus=()=>{
    if(this.state.check ===true){
      this.setState({check: false})
    }
    if(this.state.check ===false){
      this.setState({check: true})
    }
  }
  currentNumber =(value)=>{
      return formatNumber(value, {
      separator: ',',
      suffix: ' VND',
    })
 }
  statusBodyTemplate=(rowData)=> {
    if (rowData === "3") {
       return <Text style={styles.product_status_1}>{"Chờ bên thuê nhà xác nhận"}</Text>;
    }
    if (rowData === "1") {return  <Text style={styles.product_status_0}>{"Đã xác nhận"}</Text>; }
  }
  render(){
    const {item} = this.props.route.params
    return (
      
      <SafeAreaView style={{flex: 1,backgroundColor:'#cccc'}} >
        <ScrollView>
          <View style={styles.body}>
               <View style={styles.header_contract}>
                    <Text style={{fontSize:20}}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</Text>
                  <Text style={{fontSize:20}}>Độc lập – Tự do – Hạnh phúc</Text>
                  <Text style={{fontSize:22,fontWeight:'bold',margin:'3%'}}>HỢP ĐỒNG THUÊ NHÀ</Text>
               </View>
               <View style={styles.body_contract}>
                  <Text style={{fontSize:18,fontWeight:'bold'}}>Chúng tôi gồm:</Text>
                  <Text style={{fontSize:18}}>1. Đại diện bên cho thuê phòng trọ (Bên A):</Text>
                  <Text style={{fontSize:18}}>- Ông/bà:</Text>
                  <Text style={{fontSize:18}}>- Sinh ngày:</Text>
                  <Text style={{fontSize:18}}>- Nơi đăng ký HK:</Text>
                  <Text style={{fontSize:18}}>- CMND số:</Text>
                  <Text style={{fontSize:18}}>- Cấp ngày:</Text>
                  <Text style={{fontSize:18}}>- Nơi cấp:</Text>
                  <Text style={{fontSize:18}}>- Số điện thoại:</Text>

                  <Text style={{fontSize:18}}>2. Bên thuê phòng trọ (Bên B):</Text>
                  <Text style={{fontSize:18}}>- Ông/bà: {item.Renter}</Text>
                  <Text style={{fontSize:18}}>- Sinh ngày:</Text>
                  <Text style={{fontSize:18}}>- Nơi đăng ký HK:</Text>
                  <Text style={{fontSize:18}}>- CMND số:</Text>
                  <Text style={{fontSize:18}}>- Cấp ngày:</Text>
                  <Text style={{fontSize:18}}>- Nơi cấp:</Text>
                  <Text style={{fontSize:18}}>- Số điện thoại:</Text>
                  <Text style={{fontSize:18,fontWeight:'bold'}}>Sau khi bàn bạc trên tinh thần dân chủ, hai bên cùng có lợi, cùng thống nhất như sau:</Text>
                  <Text style={{fontSize:18}}>Bên A đồng ý cho bên B thuê 01 phòng ở tại địa chỉ: {item.AddressHouse}</Text>
                  <Text style={{fontSize:18}}>Giá thuê phòng: …………………. đ/tháng (chưa tính tiền điện, nước hằng tháng)</Text>
                  <Text style={{fontSize:18}}>Tiền đặt cọc:</Text>
                  <Text style={{fontSize:18}}>Hợp đồng có giá trị kể từ ngày</Text>
                  <Text style={{fontSize:20,fontWeight:'bold'}}>TRÁCH NHIỆM CỦA CÁC BÊN</Text>
                  <Text style={{fontSize:18,fontWeight:'bold'}}>* Trách nhiệm của bên A:</Text>
                  <Text style={{fontSize:18}}>- Tạo mọi điều kiện thuận lợi để bên B thực hiện theo hợp đồng.</Text>
                  <Text style={{fontSize:18}}>- Cung cấp nguồn điện, nước, wifi cho bên B sử dụng.</Text>
                  <Text style={{fontSize:18,fontWeight:'bold'}}>* Trách nhiệm của bên B:</Text>
                  <Text style={{fontSize:18}}>- Thanh toán đầy đủ các khoản tiền theo đúng thỏa thuận.</Text>
                  <Text style={{fontSize:18}}>- Bảo quản các trang thiết bị và cơ sở vật chất của bên A trang bị cho ban đầu (làm hỏng phải sửa, mất phải đền).</Text>
                  <Text style={{fontSize:18}}>- Không được tự ý sửa chữa, cải tạo cơ sở vật chất khi chưa được sự đồng ý của bên A.</Text>
                  <Text style={{fontSize:18}}>- Giữ gìn vệ sinh trong và ngoài khuôn viên của phòng trọ.</Text>
                  <Text style={{fontSize:18}}>- Nếu bên B cho khách ở qua đêm thì phải báo và được sự đồng ý của chủ nhà đồng thời phải chịu trách nhiệm về các hành vi vi phạm pháp luật của khách trong thời gian ở lại.</Text>
                  <Text style={{fontSize:20,fontWeight:'bold'}}>TRÁCH NHIỆM CHUNG</Text>
                  <Text style={{fontSize:18}}>- Hai bên phải tạo điều kiện cho nhau thực hiện hợp đồng.</Text>
                  <Text style={{fontSize:18}}>- Trong thời gian hợp đồng còn hiệu lực nếu bên nào vi phạm các điều khoản đã thỏa thuận thì bên còn lại có quyền đơn phương chấm dứt hợp đồng; nếu sự vi phạm hợp đồng đó gây tổn thất cho bên bị vi phạm hợp đồng thì bên vi phạm hợp đồng phải bồi thường thiệt hại.</Text>
                  <Text style={{fontSize:18}}>- Một trong hai bên muốn chấm dứt hợp đồng trước thời hạn thì phải báo trước cho bên kia ít nhất 30 ngày và hai bên phải có sự thống nhất.</Text>
                  <Text style={{fontSize:18}}>- Bên A phải trả lại tiền đặt cọc cho bên B.</Text>
                  <Text style={{fontSize:18}}>- Bên nào vi phạm điều khoản chung thì phải chịu trách nhiệm trước pháp luật.</Text>
                  <Text style={{fontSize:18}}>- Hợp đồng được lập thành 02 bản có giá trị pháp lý như nhau, mỗi bên giữ một bản.</Text>
               </View>
                 
          </View>
            {item.Status ==='3'&&
            <View style={{marginBottom:'3%'}}>
                    
                    <View style={{alignItems:'flex-end',flexDirection:'row'}}>
                      <Switch 
                        onValueChange={this.toggleSwitch} 
                        value={this.state.toggle} 
                        thumbColor={this.state. toggle ? "#DB3022" : "#ffff"}
                         trackColor={{ false: "#767577", true: "#ffffff" }}
                         />
                      <Text style={{fontSize:15, flex:1}}>Tôi đã đọc, hiểu và đồng ý với nội dung của hợp động trên đây</Text>
                    </View>

                    {this.state.toggle ==true &&
                    <TouchableOpacity style={styles.button}>
                      <Text style={{ color: "white", fontSize: 17 }}>ĐỒNG Ý KÝ HỢP ĐỒNG</Text>
                  </TouchableOpacity>}
                  {this.state.toggle ==false &&
                    <TouchableOpacity style={styles.button_2} disabled>
                      <Text style={{ color: "white", fontSize: 17 }}>ĐỒNG Ý KÝ HỢP ĐỒNG</Text>
                  </TouchableOpacity>}
               </View>}

        </ScrollView>
      </SafeAreaView>
     
    );
  }
}
const styles = StyleSheet.create({
 body:{
   flew:1,
   margin:'1%',
   borderRadius:7,
   backgroundColor:'#ffff'
 },
 header_contract:{
    alignItems:'center',
 },
 body_contract:{
   margin:'2%'
 },
 button: {
    height:"15%",
    width:'90%',
    backgroundColor: "#DB3022",
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,
    elevation: 13,
    margin:'5%',
  },
  button_2: {
    height:"15%",
    width:'90%',
    backgroundColor: "#333333",
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,
    elevation: 13,
    margin:'5%',
  },
})