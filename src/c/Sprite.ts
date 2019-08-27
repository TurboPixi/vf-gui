import UIBase from "../UIBase";

/**
 * UI图片显示对象，如果使用拉伸或9切，请使用 SliceSprite
 *
 * @class
 * @extends PIXI.UI.UIBase
 * @memberof PIXI.UI
 * @param Texture {PIXI.Texture} 文本对象
 */
export default class Sprite extends UIBase{
    public constructor(t?: PIXI.Texture){
        super();
        this._source = t;
        this._sprite = new PIXI.Sprite(t);
        this.container.addChild(this._sprite);

    }
    protected _sprite: PIXI.Sprite;
    protected _source: number | string | PIXI.Texture |HTMLImageElement| HTMLCanvasElement | HTMLVideoElement|undefined;
    /** 
     * 获取或设置显示源 
     * 可以使key、url,PIXI.Texture | canva. 当是key时确认资源库是否存在
     * 
     * 设置null可以传入PIXI.Texture.EMPTY
     */
    public get source(): number | string | PIXI.Texture | HTMLImageElement |HTMLCanvasElement | HTMLVideoElement|undefined {
        return this._source;
    }
    public set source(value: number | string | PIXI.Texture | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement|undefined) {
        if(value === undefined){
            return;
        }
        if(value === this._source){
            return;
        }
        this._source = value;
        if(value instanceof  PIXI.Texture){
            this._sprite.texture = value;
        }else{
            this._sprite.texture = PIXI.Texture.from(value);
        }
        if(!this.height){
            this.height = this._sprite.height;
        }
        if(!this.width){
            this.width = this._sprite.width;
        } 
        this.update();
    }

    public set height(value: number){
        this.setting.height = value;
        this._sprite.height = value;
        this.updatesettings(true);

    }
    public get height() {
        return this.setting.height;
    }
    public set width(value: number){
        this.setting.width = value;
        this._sprite.width = value;
        this.updatesettings(true);
    }
    public get width() {
        return this.setting.height;
    }

    private _anchorX = 0;
    /** 设置X的锚点 */
    public get anchorX() {
        return this._anchorX;
    }
    public set anchorX(value) {
        this._anchorX = value;
        this._sprite.anchor.x = value;
    }
    private _anchorY = 0;
    /** 设置Y的锚点 */
    public get anchorY() {
        return this._anchorY;
    }
    public set anchorY(value) {
        this._anchorY = value;
        this._sprite.anchor.y = value;
    }


    public update(){
        if (!isNaN(this.tint))
            this._sprite.tint = this.tint;

        if (!isNaN(this.blendMode))
            this._sprite.blendMode = this.blendMode;
    }
}