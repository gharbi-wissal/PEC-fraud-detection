export interface Pec {
    reference: string
    prediction: string

}
export interface Metrics {
    accuracy: number
    roc_auc: number

}
export class Prediction {
    // Accord_VR: string
    // Agence: string
    // Agent: string
    // Cas_e_barème: string
    // Compagnie_adverse: string
    // Compagnie_d_assurance: string
    // Day_Accident: string
    // Day_demande:string
    // Expert: string
    // Garantie_impliquée: string
    // Marque:string
    // Mode_de_gestion:string
    // Montant_total_devis: string
    // Month_Accident: string
    // Nbr_réclamations_antérieures: string
    // Point_Choc: string
    // Position_GA: string
    // Retard_reclamation: string
    // Réparateur: string
    // SST: string
    trace : string
    prediction: number
}