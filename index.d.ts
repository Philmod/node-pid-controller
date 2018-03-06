declare namespace Controller {
    interface Options {
        k_p?: number;
        k_i?: number;
        k_d?: number;
        /**
         * Interval of time between two updates
         * If not set, it will be automatically calculated
         */
        dt?: number;
        /** The maximum absolute value of the integral term */
        i_max?: number;
    }
}

declare class Controller {
    public k_p: number;
    public k_i: number;
    public k_d: number;
    public dt: number;
    public i_max: number;

    public sumError: number;
    public lastError: number;
    public lastTime: number;

    public target: number;

    constructor(options: Controller.Options);
    constructor(k_p?: number, k_i?: number, k_d?: number, dt?: number);

    public setTarget(target: number): void;

    public update(currentValue: number): number;

    public reset(): number;
}

export = Controller;
