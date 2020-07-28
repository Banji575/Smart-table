import React, { Component } from 'react';
import Layout from './HOC/Layout/Layout';
import Table from './Components/Table/Table';
import Loader from './Components/Loader/Loader';
import './App.scss';
import { strSort, revSort } from './Components/sortFramework/sortFramework';
import DataList from './Components/DataList/DataList';
import AddContact from './Components/AddContact/AddContact';
import Button from './Components/Button/Button';
import ReactPaginate from 'react-paginate';
import lodash from 'lodash';
import SearchPaner from './Components/SearchPanel/SearchPanel';
import StartMenu from './Components/StartMenu/StartMenu';

const smallDataUrl = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
const bigDataUrl = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'


export default class App extends Component {

  state = {
    dataUrl:null,
    showStartMenu: true,
    searchString:null,
    showFormAdd:false,
    loading:true,
    filterData:null,
    data:[],
    detailData:null,
    currentPage:0,
    sortDirection: {
      id:null,
      firstName:null,
      lastName:null,
      email:null,
      phone:null
    }, 
  }

  fetchData = async(URL)=>{
    try {
    const res = await fetch(URL)
    const data = await res.json()
    this.setState({
      loading:false,
      data
      })
        } catch (e) {
    console.log(e)
    this.setState({
      loading:false,
      })
    }
  }

  addContactHundler = (contact) =>{
    const data = this.state.data.concat()
    data.unshift(contact)
    this.setState({data, showFormAdd:!this.state.showFormAdd})
  }

  onFilterHundler = (_, headName) =>{
    let filterData = this.getSearchData()
    let sortDirection = this.state.sortDirection

    sortDirection[headName]
    ? filterData = strSort(filterData, headName)
    : filterData = revSort(filterData, headName)

    Object.keys(sortDirection).forEach(name=>{
      return name===headName? sortDirection[name]=!sortDirection[name]  :sortDirection[name]=null
    })
    this.setState({filterData, sortDirection})
  }

  onDetailHundler = (evt, id) => {
    let currentIndex;
    this.state.data.forEach((el,i)=>{
      if(el.id===id){
        currentIndex = i
      }
    })
    const detailData = {...this.state.data[currentIndex]}
    this.setState({detailData})
  }

  onToggleForm = () =>{
    this.setState({
      showFormAdd:!this.state.showFormAdd
    })
  }
  
  onPageChange = ({selected})=>{
    this.setState({currentPage:selected})
  }

  onSearchInput = (evt) =>{
  this.setState({searchString:evt.target.value})
  }

  onSerachButtonHundler = () =>{
    this.setState({detailData:null})
  this.getSearchData()
  }

  getSearchData = () =>{
    const {searchString, data} = this.state
    if(!searchString || searchString ===''){
      this.setState({filterData:null})
      return data
    }else{
      let result = data.filter(item=>{
      return item['firstName'].toLowerCase().includes(searchString.toLowerCase()) ||
              item['lastName'].toLowerCase().includes(searchString.toLowerCase()) ||
              item['email'].toLowerCase().includes(searchString.toLowerCase()) ||
              item['phone'].toLowerCase().includes(searchString.toLowerCase()) 
        
    })
      
    
      this.setState({currentPage:0, filterData:result})
      return result
    }
  }

  onChangeSizeData = (data) =>{
  const dataUrl = data==='small'? smallDataUrl : bigDataUrl
  this.fetchData(dataUrl)
  this.setState({dataUrl, showStartMenu: false})
  console.log(dataUrl)
  }
  render(){
    if(this.state.showStartMenu){
      return <StartMenu
      onClickHundler = {this.onChangeSizeData}
      />
    }else{
      const data = this.state.filterData || this.state.data.concat()
      const pageSize = 50
      const pageCount = Math.ceil(data.length/pageSize)
      const currentData = lodash.chunk(data, 50)[this.state.currentPage]
      return (
        <Layout>
          {
            this.state.loading 
            ? <Loader/>
            : <React.Fragment>
              <SearchPaner
              onChange = {this.onSearchInput}
              onClick = {this.onSerachButtonHundler}
              />
              {
                this.state.showFormAdd
                ?<AddContact onAddContact = {this.addContactHundler} onToggleForm = {this.onToggleForm}/>
                :(<div className = 'optionMenu'><Button clickHundler = {this.onToggleForm}>Добавить контакт</Button></div>)
              }
                <Table
                  data = {currentData}
                  onFilterHundler = {this.onFilterHundler}
                  onDetailHundler = {this.onDetailHundler}
                  arrowDirection = {this.state.sortDirection}
                />{
                  this.state.data.length > pageSize ?
                  <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.onPageChange}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                    forcePage={this.state.currentPage}
                  />
                  : null
                }       
              </React.Fragment> 
           }
          {
          this.state.detailData
          ? <DataList detailData = {this.state.detailData}/>
          : null
          }
        </Layout>
      );
    }  
  }
}

