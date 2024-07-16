export class FindUserByUbicationRequest {
    latitude: number;
    longitud: number;

    constructor(latitude: number, longitud: number) {
        this.latitude = latitude;
        this.longitud = longitud;
    }
}