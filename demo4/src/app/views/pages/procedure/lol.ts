import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
import {MatDialog} from "@angular/material/dialog";
import {Router} from '@angular/router';
import {MarchandiseComponent} from "../marchandise/marchandise.component";
import {ServiceService} from "../../service/service.service";
import {MatTableDataSource} from "@angular/material/table";
import Swal from 'sweetalert2'
import {Pays} from "../../shared/models/Pays";
import {Observable} from "rxjs";
import {startWith, map} from 'rxjs/operators';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})


export class DemandeComponent implements OnInit {

  isLinear = false;
  ImportationForm!: FormGroup;
  displayedColumns: string[] = ['Id', 'Description', 'Origine', 'Action'];
  dataSource: any;
  marchandises: any[] = [];
  document_1!: File;
  document_2!: File;
  document_3!: File;
  document_4!: File;
  document_5!: File;

  allCountries!: Pays[];
  filteredOptions!: Observable<Pays[]>;
  myControlCountry = new FormControl();

  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private service: ServiceService,
    private router: Router) {
  }

  ngOnInit() {
    this.service.getAllCountries().subscribe(
      (data) => {
        this.allCountries = data.data
      },
      (error) => {

      }
    );

    this.filteredOptions = this.myControlCountry.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.allCountries)
      );


    let numero = localStorage.getItem('numero');
    if (numero !== "") {
      this.service.getImportationByNumero(numero).subscribe(
        (data) => {
          if (data.status === "OK") {
            this.ImportationForm = this._formBuilder.group({
              id: [data.data.id],
              numero: [data.data.numero],
              codeppm: [data.data.codeppm, Validators.required],
              ninea: [data.data.ninea],
              emailImportateur: [data.data.emailImportateur, Validators.required],
              telephoneImportateur: [data.data.telephoneImportateur],
              adresseImportateur: [data.data.adresseImportateur],
              raisonSocialeImportateur: [data.data.raisonSocialeImportateur],
              raisonSocialeVendeur: [data.data.raisonSocialeVendeur],
              adresseVendeur: [data.data.adresseVendeur],
              telephoneVendeur: [data.data.telephoneVendeur],
              paysProvenance: [data.data.paysProvenance],
              emailVendeur: [data.data.emailVendeur],
              numeroProforma: [data.data.numeroProforma],
              dateProforma: [data.data.dateProforma],
              devise: [data.data.devise],
              valeurFacture: [data.data.valeurFacture],
              contreValeur: [data.data.contreValeur],
              provenance: [data.data.provenance],
              observationsParticulieres: [data.data.observationsParticulieres],
              marchandise: [''],
              document_1: [data.data.document_1],
              document_2: [data.data.document_2],
              document_3: [data.data.document_3],
              document_4: [data.data.document_4],
              document_5: [data.data.document_5],
            });
            this.dataSource = data.data.marchandise;
          }

        },
        (error) => {

        }
      )
    }
    this.ImportationForm = this._formBuilder.group({
      id: [''],
      numero: [''],
      codeppm: ['', Validators.required],
      ninea: [''],
      emailImportateur: [''],
      telephoneImportateur: ['', Validators.required],
      adresseImportateur: [''],
      raisonSocialeImportateur: [''],
      raisonSocialeVendeur: [''],
      adresseVendeur: [''],
      telephoneVendeur: [''],
      paysProvenance: [''],
      emailVendeur: [''],
      numeroProforma: [''],
      dateProforma: [''],
      devise: [''],
      valeurFacture: [''],
      contreValeur: [''],
      provenance: [''],
      observationsParticulieres: [''],
      creationCompte: [''],
      marchandise: [''],
      document_1: [''],
      document_2: [''],
      document_3: [''],
      document_4: [''],
      document_5: [''],
    });


    this.marchandises = this.service.marchandises
    this.dataSource = this.marchandises

  }

  private _filter(name: string): Pays[] {
    const filterValue = name.toLowerCase();
    return this.allCountries.filter(option => option.nomFrFr.toLowerCase().includes(filterValue));
  }

  displayFn(pays: Pays): string {
    return pays && pays.nomFrFr ? pays.nomFrFr : '';
  }

  /*private displayFn(pays?: Pays): string | undefined {
    return pays ? pays.nomFrFr : undefined;
  }*/

  openDialog(): void {
    const dialogRef = this.dialog.open(MarchandiseComponent, {
      width: '500',
    });
    dialogRef.afterClosed().subscribe(
      result => {
        this.dataSource = new MatTableDataSource(this.service.marchandises)
      }
    )
  }

  selectDocument1(event: any): void {
    //this.document_1 = <File>event.target.files.item(0);
    this.document_1 = this.ImportationForm.value.document_1;
  }

  selectDocument2(event: any): void {
    //this.document_2 = <File>event.target.files.item(0);
    this.document_2 = this.ImportationForm.value.document_2;
  }

  selectDocument3(event: any): void {
    //this.document_3 = <File>event.target.files.item(0);
    this.document_3 = this.ImportationForm.value.document_3;
  }

  selectDocument4(event: any): void {
    //this.document_4 = <File>event.target.files.item(0);
    this.document_4 = this.ImportationForm.value.document_4;

  }

  selectDocument5(event: any): void {
    //this.document_5 = <File>event.target.files.item(0);
    this.document_5 = this.ImportationForm.value.document_5;

  }


  onSubmit() {
    this.ImportationForm.value.status = 1;
    this.ImportationForm.value.marchandise = this.marchandises;

    if (this.myControlCountry.value === null)
      this.ImportationForm.value.provenance = '';
    else
      this.ImportationForm.value.provenance = this.myControlCountry.value.nomFrFr;
    const formData: FormData = new FormData();
    formData.append('importation', JSON.stringify(this.ImportationForm.value));
    if (this.document_1)
      formData.append('document_1', this.document_1);
    if (this.document_2)
      formData.append('document_2', this.document_2);
    if (this.document_3)
      formData.append('document_3', this.document_3);
    if (this.document_4)
      formData.append('document_4', this.document_4);
    if (this.document_5)
      formData.append('document_5', this.document_5);

    this.service.createDemande(formData).subscribe(
      (data) => {
        if (data.status === "OK") {
          this.service.getUserByMail(this.ImportationForm.value.emailImportateur).subscribe(
            (dataUser) => {
              if (dataUser.status === "OK") {
                Swal.fire({
                  title: 'Votre demande a été soumise avec succès.',
                  text: 'Un mail vous est envoyé à l’adresse indiquée. Pour pouvoir payer les frais et suivre votre dossier, veuillez utiliser ce numéro de dossier N˚ ' + data.data.numero + '\n \n \n \n',
                  icon: 'success',
                  confirmButtonColor: "GREEN",
                  confirmButtonText: 'OK',
                });
                this.router.navigate(['']); // tells them they've been logged out (somehow)

              } else {
                Swal.fire({
                  icon: 'success',
                  title: 'Votre demande a été soumise avec succès.',
                  text: 'Un mail vous est envoyé à l’adresse indiquée. Pour pouvoir payer les frais et suivre votre dossier, veuillez utiliser ce numéro de dossier N˚ ' + data.data.numero + '\n \n \n \n',
                  confirmButtonText: 'OK',
                  confirmButtonColor: "GREEN",
                }).then((result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {
                    Swal.fire({
                      title: 'Information',
                      text: 'Souhaitez-vous créer un compte ?',
                      icon: 'info',
                      showCancelButton: true,
                      confirmButtonText: 'Oui',
                      confirmButtonColor: 'green',
                      cancelButtonColor: "red",
                      cancelButtonText: 'Non'
                    }).then((result) => {
                      if (result.value) {
                        localStorage.setItem('numero', data.data.numero);
                        this.router.navigate(['register']); // tells them they've been logged out (somehow)
                      } else if (result.dismiss === Swal.DismissReason.cancel) {
                        this.router.navigate(['']); // tells them they've been logged out (somehow)

                        /*const utilisateur: Utilisateur = new Utilisateur();
                        utilisateur.numeroDii = data.data.numero;
                        utilisateur.email = data.data.emailImportateur;
                        utilisateur.telephone = data.data.telephoneImportateur;
                        formData.append('utilisateur', JSON.stringify(utilisateur));
                        this.service.inscriptionTemporaire(formData).subscribe((data) => {
                          },
                          (error) => {

                          });*/
                      }
                    });
                  } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                  }
                })


              }
            }, (error) => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Une Erreur est survenue',
              });
            });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Une Erreur est survenue',
          });
        }

      }, (err: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Une Erreur est survenue',
        });
      });
  }


  brouillon() {
    this.ImportationForm.value.marchandise = this.marchandises;
    if (this.myControlCountry.value === null)
      this.ImportationForm.value.provenance = '';
    else
      this.ImportationForm.value.provenance = this.myControlCountry.value.nomFrFr;
    const formData: FormData = new FormData();
    formData.append('importation', JSON.stringify(this.ImportationForm.value));
    if (this.document_1)
      formData.append('document_1', this.document_1);
    if (this.document_2)
      formData.append('document_2', this.document_2);
    if (this.document_3)
      formData.append('document_3', this.document_3);
    if (this.document_4)
      formData.append('document_4', this.document_4);
    if (this.document_5)
      formData.append('document_5', this.document_5);

    this.service.createDemande(formData).subscribe(
      (data:any) => {
        if (data.status === "OK") {
          localStorage.clear()
          /*Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Votre demande N˚ ' + data.data.numero + ' a été a ete sauvegardée avec succès',
            showConfirmButton: true,
          })*/

          Swal.fire({
            title: 'Votre demande N˚ ' + data.data.numero + ' a été sauvegardée avec succès',
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: `OK`,
            confirmButtonColor: 'GREEN',
            denyButtonText: `Don't save`,
            icon: 'success'
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              //Swal.fire('Saved!', '', 'success')
              this.router.navigate(['']); // tells them they've been logged out (somehow)
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })

          /*Swal.fire(
            'Information',
            'Votre demande a été soumise avec succès en mode brouillon.',
            'success'
          )*/

        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Une Erreur est survenue',
          })
        }

      }, (err: any) => {
        console.log(err);
      })
  }

  closeDialog() {
    this.router.navigate(['']);
  }

  myMethod(value: string) {
    this.service.getCodeppm(value).subscribe(data => {
      this.ImportationForm = this._formBuilder.group({
        id: [''],
        numero: [''],
        codeppm: [data.data.codeppm],
        ninea: [data.data.ninea],
        emailImportateur: [data.data.email],
        telephoneImportateur: [data.data.telephone],
        adresseImportateur: [data.data.adresse],
        raisonSocialeImportateur: [data.data.raisonSociale],
        adresseVendeur: [''],
        telephoneVendeur: [''],
        paysProvenance: [''],
        emailVendeur: [''],
        numeroProforma: [''],
        dateProforma: [''],
        devise: [''],
        valeurFacture: [''],
        contreValeur: [''],
        provenance: [''],
        observationsParticulieres: [''],
        creationCompte: [''],
        marchandise: [''],
        document_1: [''],
        document_2: [''],
        document_3: [''],
        document_4: [''],
        document_5: [''],
        status: ['']
      });
    }, error => {

    });

  }

  openDialogDelete(element: any) {
    this.dataSource = this.dataSource.data.filter((value: any, key: any) => {
      return value.description != element.description;
    });
  }

  goToHome() {
    localStorage.clear();
    sessionStorage.clear()
    this.router.navigate(['']);
  }

}