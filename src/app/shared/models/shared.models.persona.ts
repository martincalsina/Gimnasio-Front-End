export class Persona {
    constructor(
      public nombre: string,
      public apellido: string,
      public correo: string,
      public password: string
    ) {}

    public getNombre(): string { return this.nombre; }
    
    public getApellido(): string { return this.apellido; }

    public getCorreo(): string { return this.correo; }

    public getPassword(): string { return this.password; }
}
  