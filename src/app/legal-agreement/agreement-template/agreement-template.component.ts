import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";

import { AppService } from "app/app.service";
import { ProfileService } from "app/profiles/profile.service";
import { AppComponent } from "app/app.component";
import { FileSizePipe } from "app/shared/pipes/filesize.pipe";
import { LoginService } from "app/shared/services/login.service";

@Component({
  selector: "app-agreement-template",
  templateUrl: "./agreement-template.component.html",
  styleUrls: ["./agreement-template.component.scss"],
})
export class AgreementTemplateComponent implements OnInit {
  public productCategoryList: string[] = [];
  private productlist: any[] = [];
  private map = new Map<string, any[]>();
  private selectedProductId: string = "";
  private selectedFile: any;
  private errors = false;
  private showJSON = false;
  public contractDocs: any[] = [];
  productNames: any[] = [];
  public showSaveButton: boolean;
  /**
   *
   * @param loginService
   * @param appService
   * @param profileService
   * @param appComponent
   */
  constructor(
    public loginService: LoginService,
    public appService: AppService,
    public profileService: ProfileService,
    public appComponent: AppComponent,
    public fileSize: FileSizePipe
  ) {}

  ngOnInit() {
    // Fetch the access token from the login service.
    // Populate the product list and organize the categories.
    this.populateProductList();
    this.organizeProductCategories();
  }

  /**
   * Helper function to populate the product list based on certain conditions.
   */
  private populateProductList(): void {
    this.productNames = [];
    this.productlist = this.loginService.productsData
      .filter(
        (element) =>
          element.template.Terms[0].ContractType !== "" &&
          element.status === "active"
      )
      .map((element) => {
        const { productID, template } = element;
        const { ProductIdentifier, Selection } = template;
        const ProductCategory = Selection.ProductCategory || "";

        return {
          id: productID,
          ProductIdentifier,
          ProductCategory,
        };
      });
  }

  /**
   * Helper function to organize product categories and products in a map.
   */
  private organizeProductCategories(): void {
    // Create a Map to store the product categories and their respective products.
    const productCategoryMap = new Map<string, any[]>();

    // Populate the productCategoryMap with products grouped by their categories.
    this.productlist.forEach((product) => {
      if (product.ProductCategory !== "") {
        const { ProductCategory, ...rest } = product; // Extracting ProductCategory and rest of the properties.
        const existingCategoryProducts =
          productCategoryMap.get(ProductCategory) || [];

        productCategoryMap.set(ProductCategory, [
          ...existingCategoryProducts,
          rest,
        ]);
      }
    });

    // Sort the product categories alphabetically.
    this.productCategoryList = Array.from(productCategoryMap.keys()).sort(
      (a, b) => a.localeCompare(b)
    );

    // Assign the organized map to this.map (if needed).
    this.map = productCategoryMap;
  }

  /**
   * Function called when the user selects a product category.
   * @param event The change event of the product category selection.
   */
  public onChangeProductCategory(event: Event): void {
    this.selectedProductId = "";

    this.productNames = [];

    const selectedCategory = (event.target as HTMLInputElement).value;
    const productsInCategory = this.map.get(selectedCategory) || [];

    // Update productlist and sort it alphabetically by ProductIdentifier.

    this.productNames = [...productsInCategory].sort((a, b) =>
      a.ProductIdentifier.localeCompare(b.ProductIdentifier)
    );
  }

  /**
   * Function called when the user selects a product name.
   * @param event The change event of the product name selection.
   */
  public onChangeProductName(event: Event): void {
    const selectedProductId = (this.selectedProductId = (
      event.target as HTMLInputElement
    ).value);
    if (!selectedProductId) {
      // If the selectedProductId is empty, reset the contractDocs and return early.
      this.contractDocs = [];
      return;
    }

    // Fetch contract documents for the selected product using the ProfileService.
    this.profileService.getProductTemplateFile(selectedProductId).subscribe(
      (document) => {
        this.contractDocs = document["data"]?.documents || [];
      },
      (error) => {
        console.error("Error fetching contract documents:", error);
        // Optionally, you can display an error message to the user or handle the error as needed.
      }
    );
  }

  /**
   * Function called when the user selects a file for upload.
   * @param event The change event when a file is selected.
   */
  public onFileChange(event): void {
    this.showSaveButton = false;
    let regex: RegExp = /[^\s].+(doc|docx)$/i;
    if (regex.test(event.target.files[0].name)) {
      if (this.fileSize.getFileSize(event.target.files[0].size) < 501) {
        // this.documentFileSize = this.fileSize.transform(
        //   event.target.files[0].size,
        //   "KB"
        // );

        this.selectedFile = event.target.files[0];
      } else {
        Swal.fire({
          title: `<h3 class="swal-msg-font swal-title-font">File Size Exceeded</h3>`,
          html: `<h4 class="swal-msg-font swal-text-font">Please upload a file less than 500KB</h4>`,
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2000,
          focusConfirm: true,
          icon: "error",
        });
      }
    } else {
      this.showSaveButton = true;
      this.selectedFile = null;
      Swal.fire({
        title: ``,
        html: `<h4 class="swal-msg-font swal-text-font">Please upload docx files</h4>`,
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2000,
        focusConfirm: true,
        icon: "error",
      });
    }
  }

  /**
   * Function called when the user submits the form.
   * @param form The form data to be submitted.
   */
  public onSubmit(form: any): void {
    // Check if all form fields are valid (not empty).
    const isFormValid = this.hasEmptyValues(form);
    if (!isFormValid) {
      this.appComponent.showLoader = true;

      // Prepare the form data and file name for saving the document.
      const formData = new FormData();

      const today = new Date().toISOString();
      const selectedProduct = this.productlist.find(
        (product) => product.id === +form.ProductIdentifier
      );
      const fileName = `${selectedProduct.ProductIdentifier.replace(
        /\s+/g,
        "_"
      )}.docx`;
      formData.append("file", this.selectedFile, fileName);
      // Save the document using the ProfileService.
      this.profileService
        .addProductTemplateFile(form.ProductIdentifier, formData)
        .subscribe((res) => {
          this.appComponent.showLoader = false;
          Swal.fire({
            title: `<h3 class="swal-msg-font swal-title-font">${res["message"]}</h3>`,
            html: "",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 1500,
            focusConfirm: true,
            icon: "success",
          });
          // Fetch the updated contract documents after saving.
          this.profileService
            .getProductTemplateFile(this.selectedProductId)
            .subscribe((document) => {
              this.contractDocs = document["data"]?.documents || [];
            });
        });
    } else {
      this.appComponent.showLoader = false;
      // Show an error message if all fields are not selected.
      Swal.fire({
        title: `<h3 class="swal-msg-font swal-title-font">Please Select All Fields</h3>`,
        html: "",
        showCancelButton: false,
        timer: 1500,
        showConfirmButton: false,
        focusConfirm: true,
        icon: "error",
      });
    }
  }

  // Function to check if the JSON object has any empty values
  private hasEmptyValues(obj: any): boolean {
    // Iterate through the object's properties using a for...in loop
    for (const key in obj) {
      // Check if the property is directly defined on the object (not inherited from the prototype)
      if (obj.hasOwnProperty(key)) {
        // Get the value of the current property
        const value = obj[key];

        // Check if the value is empty using the isEmpty function
        if (this.isEmpty(value)) {
          return true; // If any value is empty, return true
        }
      }
    }

    // If none of the values are empty, return false
    return false;
  }

  // Function to check if a value is considered empty
  private isEmpty(value: any): boolean {
    // For arrays, check if the array is empty or if any of its elements are empty (recursively)
    if (Array.isArray(value)) {
      return value.length === 0 || value.some(this.isEmpty);
    }
    // For objects, recursively check if any of the properties are empty using the hasEmptyValues function
    else if (typeof value === "object" && value !== null) {
      return this.hasEmptyValues(value);
    } else {
      // For other types (e.g., strings, numbers, booleans), consider them empty if they are falsy (null, undefined, "", 0, false)
      return !value;
    }
  }
}
