import React, {useState,useRef, useEffect } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Ripple } from 'primereact/ripple';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';

export default function TablePrime(props){
    let emptyProduct = {
        id: null,
        name: '',
        image: null,
        description: '',
        category: null,
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
    };
    const {ColumnsName,Data}=props
    const [products, setProducts] = useState(null);
    const [product, setProduct] = useState(emptyProduct);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const toast = useRef(null);
    const [first1, setFirst1] = useState(0);
    const [rows1, setRows1] = useState(10);
    const [globalFilter, setGlobalFilter] = useState('')
    const [selectedElement, setSelectedElement] = useState(null);
    const [loading, setLoading] = useState(false);
    const dt = useRef(null)

    const [lazyParams, setLazyParams] = useState({
        first: 0,
        rows: 10,
        page: 1,
    });
    let loadLazyTimeout = null;
    
    useEffect(() => {
        loadLazyData();
    }, [lazyParams])

    const loadLazyData = () => {
        setLoading(true);

        if (loadLazyTimeout) {
            clearTimeout(loadLazyTimeout);
        }

        loadLazyTimeout = setTimeout(() => {
                setLoading(false);
        }, Math.random() * 1000 + 250);
    }

    const Content=ColumnsName.map((col,i) => {return <Column key={col.field} field={col.field} header={col.header} sortable/>})

    const reset = () => {
        setGlobalFilter('');
        dt.current.reset();
    }
    const header=(
        <div className="table-header">
                List of Customers
                <Button type="button" label="Clear" className="p-button-outlined" icon="pi pi-filter-slash" onClick={reset} />
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText type="search" value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Global Search" />
                    </span>
        </div>)

    const onCustomPage1 = (event) => {
        setFirst1(event.first);
        setRows1(event.rows);
        setCurrentPage(event.page + 1);
    }
    const template1 = {
            layout: 'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
            'PrevPageLink': (options) => {
                return (
                    <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
                        <span className="p-p-3">Anterior</span>
                        <Ripple />
                    </button>
                )
            },
            'NextPageLink': (options) => {
                return (
                    <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
                        <span className="p-p-3">Siguiente</span>
                        <Ripple />
                    </button>
                )
            },
            'PageLinks': (options) => {
                if ((options.view.startPage === options.page && options.view.startPage !== 0) || (options.view.endPage === options.page && options.page + 1 !== options.totalPages)) {
                    const className = classNames(options.className, { 'p-disabled': true });
    
                    return <span className={className} style={{ userSelect: 'none' }}>...</span>;
                }
    
                return (
                    <button type="button" className={options.className} onClick={options.onClick}>
                        {options.page + 1}
                        <Ripple />
                    </button>
                )
            },
            'RowsPerPageDropdown': (options) => {
                const dropdownOptions = [
                    { label: 10, value: 10 },
                    { label: 20, value: 20 },
                    { label: 50, value: 50 },
                    { label: 100, value: 100 },
                    { label: 200, value: 200 },
                    { label: 'All', value: options.totalRecords }
                ];
    
                return <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} appendTo={document.body} />;
            },
            'CurrentPageReport': (options) => {
                return (
                    <span style={{ userSelect: 'none',textAlign: 'center' }}>
                       Mostrando {options.first} a {options.last} de {options.totalRecords}
                    </span>
                )
            }
        };

    const editProduct = (product) => {
        setProduct({...product});
        setProductDialog(true);
    }
    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    }
    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }
    const onCategoryChange = (e) => {
        let _product = {...product};
        _product['category'] = e.value;
        setProduct(_product);
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = {...product};
        _product[`${name}`] = val;

        setProduct(_product);
    }

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = {...product};
        _product[`${name}`] = val;

        setProduct(_product);
    }
    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
    const saveProduct = () => {
        setSubmitted(true);

        if (product.name.trim()) {
            let _products = [...products];
            let _product = {...product};
            if (product.id) {
                const index = findIndexById(product.id);

                _products[index] = _product;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            }
            else {
                _product.id = createId();
                _product.image = 'product-placeholder.svg';
                _products.push(_product);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
        }
    }
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </React.Fragment>
    );
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    }
    return (
        <div className="datatable-templating-demo">
            <Toast ref={toast} />
            <div className="card">
                <DataTable 
                    ref={dt}
                    value={Data}
                    header={header}
                    className="p-datatable-sm"
                    loading={loading}
                    paginator 
                    paginatorTemplate={template1} 
                    first={first1} 
                    rows={rows1} 
                    onPage={onCustomPage1}
                    reorderableColumns
                    showGridlines
                    stripedRows 
                    sortMode="multiple"
                    removableSort
                    scrollable
                    scrollHeight="300px"
                    globalFilter={globalFilter}
                    emptyMessage="No se encontraron resultados"
                    selectionMode="multiple" 
                    metaKeySelection={false} 
                    selection={selectedElement} 
                    onSelectionChange={e => setSelectedElement(e.value)}
                >
                    {Content}
                    <Column body={actionBodyTemplate}></Column>
                </DataTable>
            </div>
            <Dialog visible={productDialog} style={{ width: '450px' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div className="p-field">
                    <label htmlFor="name">Name</label>
                    <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                    {submitted && !product.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="description">Description</label>
                    <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div>

                <div className="p-field">
                    <label className="p-mb-3">Category</label>
                    <div className="p-formgrid p-grid">
                        <div className="p-field-radiobutton p-col-6">
                            <RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={product.category === 'Accessories'} />
                            <label htmlFor="category1">Accessories</label>
                        </div>
                        <div className="p-field-radiobutton p-col-6">
                            <RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={product.category === 'Clothing'} />
                            <label htmlFor="category2">Clothing</label>
                        </div>
                        <div className="p-field-radiobutton p-col-6">
                            <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={product.category === 'Electronics'} />
                            <label htmlFor="category3">Electronics</label>
                        </div>
                        <div className="p-field-radiobutton p-col-6">
                            <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={product.category === 'Fitness'} />
                            <label htmlFor="category4">Fitness</label>
                        </div>
                    </div>
                </div>

                <div className="p-formgrid p-grid">
                    <div className="p-field p-col">
                        <label htmlFor="price">Price</label>
                        <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                    <div className="p-field p-col">
                        <label htmlFor="quantity">Quantity</label>
                        <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} integeronly />
                    </div>
                </div>
            </Dialog>
        </div>
        
    )
}