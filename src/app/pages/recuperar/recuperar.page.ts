import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
  providers: [HelperService]
})
export class RecuperarPage implements OnInit {
  userEmail: string = '';

  constructor(private route: Router, private helperService: HelperService, private activatedRoute: ActivatedRoute) { }

  parametronumeroDos: number | undefined;

  ngOnInit() {
    this.parametronumeroDos = this.activatedRoute.snapshot.params['num2'];
    console.log("parametro: ", this.parametronumeroDos);
  }

  login() {
    this.route.navigateByUrl("auth");
  }

  async enviCorr() {
    const email = this.userEmail;
    if (email.trim() !== '') {
      await this.helperService.resetPassword(email);
      this.helperService.showAlert('Email enviado, visita tu bandeja de entrada.', 'Información');
      this.route.navigateByUrl("auth");
    }
  }
}
